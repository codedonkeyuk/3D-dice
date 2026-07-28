import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react"; // Added act
import Settings from "./Settings";
import { MemoryRouter, Routes, Route } from "react-router";

const mockDbInstance = {};
const mockDbValue = {
  db: mockDbInstance,
  isLoading: false,
  error: null,
};

vi.mock("../context/CustomDiceDbProvider", () => ({
  useDiceDB: () => mockDbValue,
  CustomDiceDbProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("../storage/customDiceStore", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../storage/customDiceStore")>();
  return {
    ...actual,
    fetchDiceSelectOptions: vi.fn().mockResolvedValue([
      { id: "poker-dice-d6", name: "Custom Poker D6 Instance" },
      { id: "custom-super-d20", name: "My Special Custom D20" },
    ]),
  };
});

describe("Settings Component", () => {
  it("should render the settings page with default values", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
          <Routes>
            <Route path="/:diceId/settings" element={<Settings />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByLabelText(/foreground color/i)).toHaveValue("#ffffff");
    expect(screen.getByLabelText(/background color/i)).toHaveValue("#ff0000");
  });

  it("should update foreground color when changed", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
          <Routes>
            <Route path="/:diceId/settings" element={<Settings />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const fgInput = screen.getByLabelText(/foreground color/i);

    await act(async () => {
      fireEvent.change(fgInput, { target: { value: "#00ff00" } });
    });

    expect(fgInput).toHaveValue("#00ff00");
  });

  it("should update background color when changed", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
          <Routes>
            <Route path="/:diceId/settings" element={<Settings />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const bgInput = screen.getByLabelText(/background color/i);

    await act(async () => {
      fireEvent.change(bgInput, { target: { value: "#0000ff" } });
    });

    expect(bgInput).toHaveValue("#0000ff");
  });

  it("should select different dice types", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
          <Routes>
            <Route path="/:diceId/settings" element={<Settings />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const select = screen.getByLabelText(/dice type/i) as HTMLSelectElement;

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "My Special Custom D20" }),
      ).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(select, { target: { value: "custom-super-d20" } });
    });

    expect(select.value).toBe("custom-super-d20");
  });
});
