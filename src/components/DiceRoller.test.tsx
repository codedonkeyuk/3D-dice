import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DiceRoller from "./DiceRoller";

vi.mock("./DiceCanvas", () => ({
  default: () => <div data-testid="dice-canvas">Dice Canvas</div>,
}));

vi.mock("./SettingsButton", () => ({
  default: () => <button data-testid="settings-button">Settings</button>,
}));

describe("DiceRoller Component", () => {
  it("should render DiceCanvas and SettingsButton components", () => {
    render(<DiceRoller />);
    expect(screen.getByTestId("dice-canvas")).toBeInTheDocument();
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });
});
