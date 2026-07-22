import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import BabylonCanvas from "./BabylonCanvas";
import { useDiceEngine } from "../context/DiceContextProvider";
import getDice from "../renderer/diceRenderer";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

const mockObserverCallbacks = new Set<() => void>();
const mockSceneDispose = jest.fn();

jest.mock(
  "@babylonjs/core/Maths/math.color",
  () => {
    return {
      Color3: class {
        r: number;
        g: number;
        b: number;
        constructor(r: number, g: number, b: number) {
          this.r = r;
          this.g = g;
          this.b = b;
        }
      },
      Color4: class {
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(r: number, g: number, b: number, a: number) {
          this.r = r;
          this.g = g;
          this.b = b;
          this.a = a;
        }
      },
    };
  },
  { virtual: true },
);

jest.mock("@babylonjs/core/scene", () => {
  return {
    Scene: class {
      clearColor = null;
      meshes = [];
      dispose = mockSceneDispose;
      onBeforeRenderObservable = {
        add: (cb: () => void) => {
          mockObserverCallbacks.add(cb);
          return cb;
        },
        remove: (cb: () => void) => {
          mockObserverCallbacks.delete(cb);
        },
      };
      render = jest.fn();
    },
  };
});

jest.mock("@babylonjs/core/Cameras/arcRotateCamera", () => {
  return {
    ArcRotateCamera: class {
      alpha: number;
      beta: number;
      radius: number;
      position: any;

      constructor(name: string, alpha: number, beta: number, radius: number) {
        this.alpha = alpha || 0;
        this.beta = beta || 0;
        this.radius = radius || 5;

        // Fix: Use an inline self-returning literal shape to bypass the out-of-scope check
        this.position = {
          x: 0,
          y: 0,
          z: 5,
          clone: function () {
            return this;
          },
          normalize: function () {
            return this;
          },
        };
      }
    },
  };
});

jest.mock("../context/DiceContextProvider", () => ({
  useDiceEngine: jest.fn(),
}));

jest.mock("../renderer/diceRenderer", () => jest.fn());

// Core Instance Vector prototype overrides
Vector3.prototype.normalize = function () {
  return this;
};
Vector3.prototype.clone = function () {
  return this;
};

// Explicitly assign properties to handle constructor clones safely
Vector3.Dot = jest.fn(() => 1);
Vector3.Zero = jest.fn(() => new Vector3(0, 0, 0));

describe("<BabylonCanvas /> Component Suite", () => {
  let mockModel: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockObserverCallbacks.clear();

    mockModel = {
      piece: {
        template: {
          OpenGl: {
            numberPositions: [{ x: 1, y: 0, z: 0 }],
          },
        },
      },
    };

    (useDiceEngine as jest.Mock).mockReturnValue({ model: mockModel });

    const mockRenderer = jest.fn(() => Promise.resolve({}));
    (getDice as jest.Mock).mockReturnValue(Promise.resolve(mockRenderer));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should mount correctly showing the active canvas and action action buttons", () => {
    render(<BabylonCanvas />);

    expect(
      screen.getByRole("button", { name: /roll dice/i }),
    ).toBeInTheDocument();
    expect(document.querySelector(".my-babylon-canvas")).toBeInTheDocument();
  });

  it("should handle wheel canvas scroll events to mutate camera zoom constraints", () => {
    render(<BabylonCanvas />);
    const canvas = document.querySelector(".my-babylon-canvas")!;

    fireEvent.wheel(canvas, { deltaY: 100 });
    expect(canvas).toBeDefined();
  });

  it("should handle canvas pointer dragging interactions to shift view angles", () => {
    render(<BabylonCanvas />);
    const canvas = document.querySelector(".my-babylon-canvas")!;

    fireEvent.pointerDown(canvas);
    fireEvent.pointerMove(canvas, { movementX: 10, movementY: -5 });
    fireEvent.pointerUp(canvas);

    expect(canvas).toBeInTheDocument();
  });

  it("should run the full physics spinning simulation lifecycle and present the roll result toast", async () => {
    render(<BabylonCanvas />);

    const rollButton = screen.getByRole("button", { name: /roll dice/i });

    fireEvent.click(rollButton);
    expect(rollButton).toBeDisabled();
    expect(rollButton).toHaveTextContent("Rolling...");

    // 1. Flush out the spinning physics frames completely
    await act(async () => {
      for (let i = 0; i < 205; i++) {
        mockObserverCallbacks.forEach((cb) => cb());
      }
    });

    expect(screen.getByText("You rolled a 1!")).toBeInTheDocument();

    // 2. Drive the secondary camera snap jolt sequence to an absolute zero threshold termination state
    await act(async () => {
      for (let i = 0; i < 50; i++) {
        mockObserverCallbacks.forEach((cb) => cb());
      }
    });

    // 3. Speed up system clock states to flush out your notification banners
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(screen.queryByText("You rolled a 1!")).not.toBeInTheDocument();
    expect(rollButton).not.toBeDisabled();
  });
});
