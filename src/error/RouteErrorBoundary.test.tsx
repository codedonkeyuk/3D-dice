import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter, data } from "react-router";
import { RouteErrorBoundary } from "./RouteErrorBoundary";
import DiceNotFoundError from "./DiceNotFoundError";

vi.mock("./Errors", () => ({
  Error404: () => <div data-testid="error-404">Mocked 404 View</div>,
  Error500: () => <div data-testid="error-500">Mocked 500 View</div>,
  ErrorDiceMissing: () => (
    <div data-testid="error-dice-missing">Mocked Dice Missing View</div>
  ),
}));

describe("RouteErrorBoundary Component", () => {
  it("should render Error404 view when catching a true Router 404 Response from a loader", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const routes = [
      {
        path: "/",
        ErrorBoundary: RouteErrorBoundary,
        HydrateFallback: () => null,
        loader: () => {
          throw data("Not Found", { status: 404 });
        },
        element: <div>This won't render</div>,
      },
    ];

    const testRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={testRouter} />);

    const element = await screen.findByTestId("error-404");
    expect(element).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 0));
    consoleSpy.mockRestore();
  });

  it("should render ErrorDiceMissing view when catching a custom DiceNotFoundError", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const ThrowDiceMissing = () => {
      throw new DiceNotFoundError("faulty-d20");
    };

    const routes = [
      {
        path: "/",
        ErrorBoundary: RouteErrorBoundary,
        element: <ThrowDiceMissing />,
      },
    ];

    const testRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("error-dice-missing")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("should render Error500 fallback view when catching generic JavaScript exceptions", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const ThrowGenericError = () => {
      throw new Error("Unexpected database timeout");
    };

    const routes = [
      {
        path: "/",
        ErrorBoundary: RouteErrorBoundary,
        element: <ThrowGenericError />,
      },
    ];

    const testRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("error-500")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
