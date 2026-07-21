import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./BabylonCanvas", () => {
  return function MockedBabylonCanvas() {
    return <div data-testid="mock-babylon-canvas" />;
  };
});

describe("App Component Unit Test", () => {
  test("renders the layout title and the child canvas placeholder in isolation", () => {
    render(<App />);

    const mockCanvas = screen.getByTestId("mock-babylon-canvas");
    expect(mockCanvas).toBeInTheDocument();
  });
});
