import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Settings from "./Settings";
import { MemoryRouter, Routes, Route } from "react-router";

describe("Settings Component", () => {
  it("should render the settings page with default values", () => {
    render(
      <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
        <Routes>
          <Route path="/:diceId/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByLabelText(/foreground color/i)).toHaveValue("#ffffff");
    expect(screen.getByLabelText(/background color/i)).toHaveValue("#ff0000");
  });

  it("should update foreground color when changed", () => {
    render(
      <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
        <Routes>
          <Route path="/:diceId/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>,
    );

    const fgInput = screen.getByLabelText(/foreground color/i);
    fireEvent.change(fgInput, { target: { value: "#00ff00" } });
    expect(fgInput).toHaveValue("#00ff00");
  });

  it("should update background color when changed", () => {
    render(
      <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
        <Routes>
          <Route path="/:diceId/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>,
    );

    const bgInput = screen.getByLabelText(/background color/i);
    fireEvent.change(bgInput, { target: { value: "#0000ff" } });
    expect(bgInput).toHaveValue("#0000ff");
  });

  it("should select different dice types", () => {
    render(
      <MemoryRouter initialEntries={["/poker-dice-d6/settings"]}>
        <Routes>
          <Route path="/:diceId/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>,
    );

    const select = screen.getByLabelText(/dice type/i) as HTMLSelectElement;

    fireEvent.change(select, { target: { value: "number-dice-d20" } });

    expect(select.value).toBe("number-dice-d20");
  });
});
