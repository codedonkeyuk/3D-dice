import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SettingsForm from "./SettingsForm";

let mockSearchParams = new URLSearchParams();
const mockSetSearchParams = jest.fn();

jest.mock("react-router", () => ({
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
}));

jest.mock("./SettingsDialog", () => {
  return function MockSettingsDialog({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="settings-dialog">{children}</div>;
  };
});

describe("SettingsForm Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it("renders with default values when no query parameters are present", () => {
    render(<SettingsForm />);

    const fgInput = screen.getByLabelText(/Foreground Color:/i);
    expect(fgInput).toHaveValue("#ffffff");

    const bgInput = screen.getByLabelText(/Background Color:/i);
    expect(bgInput).toHaveValue("#ff0000");

    const diceSelect = screen.getByLabelText(/Dice Type:/i);
    expect(diceSelect).toHaveValue("poker-dice-d6");
  });

  it("renders values correctly from URL parameters", () => {
    mockSearchParams = new URLSearchParams({
      "foreground-color": "#00ff00", // Normalised to lowercase hex values
      "background-color": "#0000ff",
      "dice-type": "number-dice-d20",
    });

    render(<SettingsForm />);

    const fgInput = screen.getByLabelText(/Foreground Color:/i);
    expect(fgInput).toHaveValue("#00ff00");

    const bgInput = screen.getByLabelText(/Background Color:/i);
    expect(bgInput).toHaveValue("#0000ff");

    const diceSelect = screen.getByLabelText(/Dice Type:/i);
    expect(diceSelect).toHaveValue("number-dice-d20");
  });

  it("calls setSearchParams when the foreground color is changed", () => {
    render(<SettingsForm />);

    const fgInput = screen.getByLabelText(/Foreground Color:/i);
    fireEvent.change(fgInput, { target: { value: "#123456" } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("calls setSearchParams when the dice type is changed", () => {
    render(<SettingsForm />);

    // Removed the broken '40549863' label element lookup
    const select = screen.getByLabelText(/Dice Type:/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "number-dice-d20" } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("calls setParams for the background color", () => {
    render(<SettingsForm />);

    const bgInput = screen.getByLabelText(/Background Color:/i);
    fireEvent.change(bgInput, { target: { value: "#900000" } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
