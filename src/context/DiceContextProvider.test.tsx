import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { DiceContextProvider, useDiceEngine } from "./DiceContextProvider";
import { findDice } from "../models/find";
import DiceNotFoundError from "../error/DiceNotFoundError";

vi.mock("../models/find", () => ({
  findDice: vi.fn(),
}));

const ContextConsumerTestChild = () => {
  const { model } = useDiceEngine();

  if (!model) {
    return <div data-testid="no-model">No Model Found</div>;
  }

  return (
    <div>
      <span data-testid="dice-id">{model.id}</span>
      <span data-testid="fg-color">{model.form?.foregroundColor}</span>
      <span data-testid="bg-color">{model.form?.backgroundColor}</span>
    </div>
  );
};

const renderWithRouterContext = (initialPath: string) => {
  const routes = [
    {
      path: "/:diceId?",
      element: (
        <DiceContextProvider>
          <ContextConsumerTestChild />
        </DiceContextProvider>
      ),
    },
  ];

  const testRouter = createMemoryRouter(routes, {
    initialEntries: [initialPath],
  });

  return render(<RouterProvider router={testRouter} />);
};

describe("DiceContextProvider Component", () => {
  const mockDiceData = {
    id: "poker-dice-d6",
    form: {
      initialProp: "value",
    },
  };

  it("should resolve default layout properties when paths and search fields are absent", () => {
    vi.mocked(findDice).mockReturnValue(mockDiceData as any);

    renderWithRouterContext("/");

    expect(findDice).toHaveBeenCalledWith("poker-dice-d6");
    expect(screen.getByTestId("dice-id")).toHaveTextContent("poker-dice-d6");

    expect(screen.getByTestId("fg-color")).toHaveTextContent("#FFFFFF");
    expect(screen.getByTestId("bg-color")).toHaveTextContent("#FF0000");
  });

  it("should extract URL search queries and map them to the form model structure", () => {
    vi.mocked(findDice).mockReturnValue({
      id: "custom-d20",
      form: {
        type: "paper-model-setup",
        thumbnail: null,
      },
      name: "a name",
      category: "model",
      description: "",
      readOnly: false,
      piece: {
        modelId: "model-id",
        renderType: "mesh",
        metalic: false,
        transparent: false,
      },
    });

    renderWithRouterContext(
      "/custom-d20?foreground-color=%2300FF00&background-color=%23000000",
    );

    expect(findDice).toHaveBeenCalledWith("custom-d20");
    expect(screen.getByTestId("dice-id")).toHaveTextContent("custom-d20");
    expect(screen.getByTestId("fg-color")).toHaveTextContent("#00FF00");
    expect(screen.getByTestId("bg-color")).toHaveTextContent("#000000");
  });

  it("should throw dice not found error if dice does not exist", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(findDice).mockReturnValue(undefined);

    let caughtError: any = null;
    const TestBoundary = () => {
      const { useRouteError } = require("react-router");
      caughtError = useRouteError();
      return <div>Error Handled</div>;
    };

    const routes = [
      {
        path: "/:diceId?",
        ErrorBoundary: TestBoundary,
        element: (
          <DiceContextProvider>
            <ContextConsumerTestChild />
          </DiceContextProvider>
        ),
      },
    ];

    const testRouter = createMemoryRouter(routes, {
      initialEntries: ["/ghost-dice-type"],
    });
    render(<RouterProvider router={testRouter} />);
    expect(caughtError).toBeInstanceOf(DiceNotFoundError);
    consoleSpy.mockRestore();
  });

  it("should crash with a strict framework crash if the hook is invoked outside a provider wrapper", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<ContextConsumerTestChild />)).toThrowError(
      "useDiceEngine framework error",
    );

    consoleSpy.mockRestore();
  });
});
