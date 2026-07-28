import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { DiceContextProvider, useDiceEngine } from "./DiceContextProvider";
import { findDice } from "../models/find";
import { getCustomDice } from "../storage/customDiceStore";

// 1. STABILISE MOCK REFERENCES GLOBAL TO PREVENT INFINITE RENDERING LOOPS
const mockDbInstance = {};
const mockDbValue = {
  db: mockDbInstance, // Stays reference-equal on subsequent renders
  isLoading: false,
  error: null,
};

vi.mock("./CustomDiceDbProvider", () => ({
  useDiceDB: () => mockDbValue,
  CustomDiceDbProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("../storage/customDiceStore", () => ({
  getCustomDice: vi.fn(),
}));

vi.mock("../models/find", () => ({
  findDice: vi.fn(),
}));

const ContextConsumerTestChild = () => {
  const { model } = useDiceEngine();

  if (!model) {
    return <div data-testid="no-model">No Model Found</div>;
  }

  return (
    <div>
      <span data-testid="dice-id">{model.id}</span>
      <span data-testid="fg-color">{model.form?.foregroundColor}</span>
      <span data-testid="bg-color">{model.form?.backgroundColor}</span>
    </div>
  );
};

const renderWithRouterContext = (initialPath: string) => {
  const routes = [
    {
      path: "/:diceId",
      element: (
        <DiceContextProvider>
          <ContextConsumerTestChild />
        </DiceContextProvider>
      ),
    },
  ];

  const testRouter = createMemoryRouter(routes, {
    initialEntries: [initialPath],
  });

  return render(<RouterProvider router={testRouter} />);
};

describe("DiceContextProvider Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockDiceData = {
    id: "poker-dice-d6",
    form: {
      initialProp: "value",
    },
  };

  it("should resolve default layout properties when search fields are absent", async () => {
    vi.mocked(findDice).mockReturnValue(mockDiceData as any);

    renderWithRouterContext("/poker-dice-d6");

    await waitFor(() => {
      expect(findDice).toHaveBeenCalledWith("poker-dice-d6");
    });

    expect(screen.getByTestId("dice-id")).toHaveTextContent("poker-dice-d6");
    expect(screen.getByTestId("fg-color")).toHaveTextContent("#FFFFFF");
    expect(screen.getByTestId("bg-color")).toHaveTextContent("#FF0000");
  });

  it("should extract URL search queries and map them to the form model structure", async () => {
    vi.mocked(findDice).mockReturnValue({
      id: "custom-d20",
      form: {
        type: "paper-model-setup",
        thumbnail: null,
      },
    } as any);

    renderWithRouterContext(
      "/custom-d20?foreground-color=%2300FF00&background-color=%23000000",
    );

    await waitFor(() => {
      expect(findDice).toHaveBeenCalledWith("custom-d20");
    });

    expect(screen.getByTestId("dice-id")).toHaveTextContent("custom-d20");
    expect(screen.getByTestId("fg-color")).toHaveTextContent("#00FF00");
    expect(screen.getByTestId("bg-color")).toHaveTextContent("#000000");
  });

  it("should safely handle database fallback missing entries", async () => {
    vi.mocked(findDice).mockReturnValue(undefined);
    vi.mocked(getCustomDice).mockResolvedValue(undefined);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithRouterContext("/ghost-dice-type");

    await waitFor(() => {
      expect(screen.getByTestId("no-model")).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it("should crash with a strict framework crash if the hook is invoked outside a provider wrapper", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<ContextConsumerTestChild />)).toThrowError(
      "useDiceEngine framework error",
    );

    consoleSpy.mockRestore();
  });
});
