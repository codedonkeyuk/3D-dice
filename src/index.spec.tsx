import { screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Application Root Entry", () => {
  let rootElement: HTMLDivElement;

  beforeEach(() => {
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);
  });

  afterEach(() => {
    document.body.removeChild(rootElement);
  });

  it("renders the App component into the root DOM element", async () => {
    await act(async () => {
      await import("./index.tsx");
    });

    const headingElement = await screen.findByRole("heading", {
      name: /hello, react \+ typescript \+ webpack!/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
