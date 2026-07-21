import "@testing-library/jest-dom";
import { waitFor, act } from "@testing-library/react";

jest.mock("./components/App", () => () => <div data-testid="mocked-app" />);
jest.mock("./main.css", () => ({}));

describe("Application Root Mounting", () => {
  test("should mount the application into the DOM without throwing", async () => {
    const container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);

    await act(async () => {
      await import("./Index");
    });

    await waitFor(() => {
      expect(container).not.toBeEmptyDOMElement();
    });

    container.remove();
  });
});
