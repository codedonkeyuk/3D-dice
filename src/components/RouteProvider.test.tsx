import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { router } from "./RouteProvider";

vi.mock("./DiceRoller", () => ({
  default: () => <div data-testid="dice-roller">Dice Roller Component</div>,
}));

vi.mock("./Settings", () => ({
  default: () => <div data-testid="settings">Settings Component</div>,
}));

vi.mock("../context/DiceContextProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dice-context">{children}</div>
  ),
}));

const MockFallback = () => <div data-testid="fallback">Loading...</div>;

describe("Router Paths using Data-Driven Memory Instances", () => {
  it("should redirect from root '/' to '/poker-dice-d6'", async () => {
    const routesWithFallback = router.routes.map((route) => ({
      ...route,
      HydrateFallback: MockFallback,
    }));

    const testRouter = createMemoryRouter(routesWithFallback, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByTestId("dice-roller")).toBeInTheDocument();
    });
  });

  it("should land directly on the settings sub-path", async () => {
    const routesWithFallback = router.routes.map((route) => ({
      ...route,
      HydrateFallback: MockFallback,
    }));

    const testRouter = createMemoryRouter(routesWithFallback, {
      initialEntries: ["/standard-d6/settings"],
    });

    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByTestId("settings")).toBeInTheDocument();
    });
  });

  it("should render the 404 Error page for an unknown route", async () => {
    const routesWithFallback = router.routes.map((route) => ({
      ...route,
      HydrateFallback: MockFallback,
    }));

    const testRouter = createMemoryRouter(routesWithFallback, {
      initialEntries: ["/completely/invalid/route"],
    });

    render(<RouterProvider router={testRouter} />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
