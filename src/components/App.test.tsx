import React from "react";
import { render, screen, waitFor } from "@testing-library/react"; // 1. Added screen and waitFor
import App from "./App";

jest.mock("react-router", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  ),
}));

jest.mock("../context/DiceContextProvider", () => {
  return function MockDiceContextProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div data-testid="dice-context">
        <>{children}</>
      </div>
    );
  };
});

jest.mock("./SettingsForm", () => {
  return function MockSettingsForm() {
    return <div data-testid="settings-form">Settings Form</div>;
  };
});

jest.mock("./SettingsDialog", () => {
  return function MockSettingsDialog({ children }: { children: React.ReactNode }) {
    return <div data-testid="settings-dialog">{children}</div>;
  };
});

jest.mock("./BabylonCanvas", () => {
  return function MockBabylonCanvas() {
    return <div data-testid="babylon-canvas">Babylon Canvas</div>;
  };
});

describe("App Component Unit Test", () => {
  it("should render and include all child components", async () => { 
    render(<App />);

    expect(screen.getByTestId("browser-router")).toBeInTheDocument();
    expect(screen.getByTestId("dice-context")).toBeInTheDocument();
    expect(screen.getByTestId("babylon-canvas")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("settings-form")).toBeInTheDocument();
    });
  });

  it("renders the root structure", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
