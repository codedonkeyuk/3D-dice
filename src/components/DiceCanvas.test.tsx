import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DiceCanvas from "./DiceCanvas";
import { useDiceEngine } from "../context/DiceContextProvider";

vi.mock("../context/DiceContextProvider", () => ({
  useDiceEngine: vi.fn(),
}));

vi.mock("../renderer/diceRenderer", () => ({
  default: vi.fn(() => vi.fn().mockResolvedValue(null)),
}));

const mockOnBeforeRenderObservable = {
  add: vi.fn((callback) => {
    mockOnBeforeRenderObservable._callback = callback;
    return "mock-observer-id";
  }),
  remove: vi.fn(),
  _callback: null as any,
};

vi.mock("@babylonjs/core/Engines/engine", () => {
  return {
    Engine: class {
      canvasTabIndex = 0;
      runRenderLoop() {}
      resize() {}
      dispose() {}
    },
  };
});

vi.mock("@babylonjs/core/scene", () => {
  return {
    Scene: class {
      meshes: any[] = [];
      clearColor = {};
      onBeforeRenderObservable = mockOnBeforeRenderObservable;
      render() {}
      dispose() {}
    },
  };
});

vi.mock("@babylonjs/core/Maths/math.vector", () => {
  return {
    Vector3: class {
      x: number;
      y: number;
      z: number;

      constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      static Zero() {
        return { x: 0, y: 0, z: 0 };
      }

      static Dot(v1: any, v2: any) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
      }

      clone() {
        return { x: this.x, y: this.y, z: this.z };
      }

      normalize() {
        return this;
      }
    },
  };
});

vi.mock("@babylonjs/core/Cameras/arcRotateCamera", () => {
  return {
    ArcRotateCamera: class {
      alpha = 0;
      beta = 0;
      private _radius = 5;

      get radius() {
        return this._radius;
      }
      set radius(val: number) {
        this._radius = val > 6 ? 5 : val;
      }

      position = {
        clone: () => ({
          normalize: () => ({ x: 0, y: 1, z: 0 }),
        }),
      };
    },
  };
});

vi.mock("@babylonjs/core/Lights/hemisphericLight", () => {
  return {
    HemisphericLight: class {
      diffuse = {};
      groundColor = {};
      specular = {};
    },
  };
});

vi.mock("@babylonjs/core/Maths/math.color", () => {
  return {
    Color4: class {},
    Color3: class {},
  };
});

describe("DiceCanvas Component", () => {
  const mockModel = {
    piece: {
      template: {
        OpenGl: {
          numberPositions: [
            { x: 0, y: -1, z: 0 },
            { x: 0, y: 1, z: 0 },
          ],
        },
      },
    },
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(useDiceEngine).mockReturnValue({
      model: mockModel as any,
      refresh: () => {},
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    mockOnBeforeRenderObservable._callback = null;
  });

  it("should mount and render the canvas element with a roll button", () => {
    render(<DiceCanvas />);

    expect(screen.getByTestId("babylon-canvas")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /roll dice/i }),
    ).toBeInTheDocument();
  });

  it("should disable the button and show rolling state during the render cycle", async () => {
    render(<DiceCanvas />);
    const rollButton = screen.getByRole("button", { name: /roll dice/i });

    await act(async () => {
      fireEvent.click(rollButton);
    });

    expect(rollButton).toBeDisabled();
    expect(rollButton).toHaveTextContent(/rolling\.\.\./i);
  });

  it("should calculate the top face and render a results toast after animation frames finish", async () => {
    render(<DiceCanvas />);
    const rollButton = screen.getByRole("button", { name: /roll dice/i });

    await act(async () => {
      fireEvent.click(rollButton);
    });

    expect(mockOnBeforeRenderObservable._callback).toBeDefined();

    await act(async () => {
      for (let i = 0; i < 220; i++) {
        mockOnBeforeRenderObservable._callback();
      }
    });

    expect(screen.getByText(/you rolled a 2!/i)).toBeInTheDocument();
    expect(rollButton).not.toBeDisabled();
  });

  it("should dismiss the dice layout text toast automatically after the timeout ticks over", async () => {
    render(<DiceCanvas />);
    const rollButton = screen.getByRole("button", { name: /roll dice/i });

    await act(async () => {
      fireEvent.click(rollButton);
      for (let i = 0; i < 205; i++) {
        mockOnBeforeRenderObservable._callback();
      }
    });

    expect(screen.getByText(/you rolled a 2!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText(/you rolled a 2!/i)).not.toBeInTheDocument();
  });
});
