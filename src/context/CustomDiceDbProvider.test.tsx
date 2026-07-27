import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { CustomDiceDbProvider, useDiceDB } from "./CustomDiceDbProvider";
import { initCustomDiceDB } from "../storage/customDiceStore";

vi.mock("../storage/customDiceStore", () => ({
  initCustomDiceDB: vi.fn(),
}));

const TestConsumer = () => {
  const { db, isLoading, error } = useDiceDB();

  return (
    <div>
      <div data-testid="loading">{isLoading ? "Loading" : "Ready"}</div>
      <div data-testid="db-status">{db ? "Connected" : "Disconnected"}</div>
      <div data-testid="error-msg">{error || "None"}</div>
    </div>
  );
};

describe("DiceDBProvider Context", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should show loading state initially before database resolves", async () => {
    let resolvePromise: (value: any) => void = () => {};
    const deferredPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(initCustomDiceDB).mockReturnValue(
      deferredPromise as Promise<IDBDatabase>,
    );

    render(
      <CustomDiceDbProvider>
        <TestConsumer />
      </CustomDiceDbProvider>,
    );

    expect(screen.getByTestId("loading").textContent).toBe("Loading");
    expect(screen.getByTestId("db-status").textContent).toBe("Disconnected");
    expect(screen.getByTestId("error-msg").textContent).toBe("None");

    await act(async () => {
      resolvePromise({ close: vi.fn() });
      await deferredPromise;
    });
  });

  it("should successfully expose the database instance when resolution succeeds", async () => {
    const mockDbInstance = {
      close: vi.fn(),
    } as unknown as IDBDatabase;

    vi.mocked(initCustomDiceDB).mockResolvedValue(mockDbInstance);

    render(
      <CustomDiceDbProvider>
        <TestConsumer />
      </CustomDiceDbProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("Ready");
    });

    expect(screen.getByTestId("db-status").textContent).toBe("Connected");
    expect(screen.getByTestId("error-msg").textContent).toBe("None");
  });

  it("should catch errors and pass the failure message downstream when resolution breaks", async () => {
    vi.mocked(initCustomDiceDB).mockRejectedValue(
      new Error("Storage system quota exceeded"),
    );

    render(
      <CustomDiceDbProvider>
        <TestConsumer />
      </CustomDiceDbProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("Ready");
    });

    expect(screen.getByTestId("db-status").textContent).toBe("Disconnected");
    expect(screen.getByTestId("error-msg").textContent).toBe(
      "Storage system quota exceeded",
    );
  });

  it("should call the cleanup database close method automatically when the provider unmounts", async () => {
    const mockCloseSpy = vi.fn();
    const mockDbInstance = {
      close: mockCloseSpy,
    } as unknown as IDBDatabase;

    vi.mocked(initCustomDiceDB).mockResolvedValue(mockDbInstance);

    const { unmount } = render(
      <CustomDiceDbProvider>
        <TestConsumer />
      </CustomDiceDbProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("Ready");
    });

    unmount();

    expect(mockCloseSpy).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if useDiceDB is consumed outside a valid Provider boundary", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrowError(
      "useDiceDB must be used within a DiceDBProvider",
    );

    consoleSpy.mockRestore();
  });
});
