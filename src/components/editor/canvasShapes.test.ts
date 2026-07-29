import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  drawSquare,
  drawTriangle,
  drawPentagon,
  drawHexagon,
  drawLine,
  drawCircle,
  drawTarget,
  drawText,
  numberSide,
} from "./canvasShapes";
import { type GraphicElement } from "../../types";
import {
  hexagonCoordinates,
  pentagonCoordinates,
  triangleCoordinates,
} from "../../renderer/shape/Polygons";
import { svgNumberSide } from "../../renderer/svg/svgShapes";

vi.mock("../../renderer/shape/Polygons", () => ({
  triangleCoordinates: vi.fn(() => [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
  ]),
  pentagonCoordinates: vi.fn(() => [
    { x: 0, y: 0 },
    { x: 15, y: 15 },
  ]),
  hexagonCoordinates: vi.fn(() => [
    { x: 0, y: 0 },
    { x: 20, y: 20 },
  ]),
}));

vi.mock("../../renderer/svg/svgShapes", () => ({
  svgNumberSide: vi.fn(() => "<svg></svg>"),
}));

describe("Canvas Drawing Functions", () => {
  let mockCtx: any;
  let baseProps: GraphicElement;

  beforeEach(() => {
    vi.clearAllMocks();

    mockCtx = {
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      rect: vi.fn(),
      arc: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      setLineDash: vi.fn(),
      fillText: vi.fn(),
      drawImage: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 0,
      font: "",
      textBaseline: "",
    };

    baseProps = {
      id: "test-id",
      description: "Test shape",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      rotate: 45,
      type: "square",
      fillColor: "red",
      strokeColor: "blue",
      strokeWidth: 4,
    };
  });

  describe("Shape Helpers & State Pipeline", () => {
    it("should accurately configure canvas styles, translation, rotation and path containment", () => {
      drawCircle(mockCtx, baseProps);

      expect(mockCtx.fillStyle).toBe("red");
      expect(mockCtx.strokeStyle).toBe("blue");
      expect(mockCtx.lineWidth).toBe(4);
      expect(mockCtx.save).toHaveBeenCalledTimes(1);
      expect(mockCtx.restore).toHaveBeenCalledTimes(1);
      expect(mockCtx.translate).toHaveBeenCalledWith(60, 120);
      expect(mockCtx.rotate).toHaveBeenCalledWith(45 * (Math.PI / 180));
      expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
    });
  });

  describe("Geometric Drawers", () => {
    it("should construct a rect taking stroke width into consideration", () => {
      drawSquare(mockCtx, baseProps);
      expect(mockCtx.rect).toHaveBeenCalledWith(-50, -100, 96, 196);
      expect(mockCtx.stroke).toHaveBeenCalledTimes(1);
      expect(mockCtx.fill).toHaveBeenCalledTimes(1);
    });

    it("should fetch coordinates and construct a loop path for triangles", () => {
      drawTriangle(mockCtx, baseProps);
      expect(triangleCoordinates).toHaveBeenCalledWith(-50, -100, 100, 200);
      expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(10, 10);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(0, 0);
    });

    it("should draw pentagon boundaries with specific coordinates", () => {
      drawPentagon(mockCtx, baseProps);
      expect(pentagonCoordinates).toHaveBeenCalledWith(-50, -100, 100, 200);
    });

    it("should draw hexagon boundaries with specific coordinates", () => {
      drawHexagon(mockCtx, baseProps);
      expect(hexagonCoordinates).toHaveBeenCalledWith(-50, -100, 100, 200);
    });

    it("should draw explicit line structures cleanly with cleared dashes", () => {
      const lineProps: GraphicElement = {
        ...baseProps,
        coOrds: [
          { x: 5, y: 5 },
          { x: 15, y: 25 },
        ],
      };
      drawLine(mockCtx, lineProps);

      expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
      expect(mockCtx.setLineDash).toHaveBeenCalledWith([]);
      expect(mockCtx.moveTo).toHaveBeenCalledWith(15, 25);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(15, 25);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(25, 45);
      expect(mockCtx.stroke).toHaveBeenCalledTimes(1);
    });

    it("should track perfect circular coordinates wrapping isolated arcs", () => {
      drawCircle(mockCtx, baseProps);
      expect(mockCtx.arc).toHaveBeenCalledWith(0, 0, 50, 0, 2 * Math.PI);
    });
  });

  describe("Complex & Specialized Composition Elements", () => {
    it("should compose multiple elements sequentially inside the target generator", () => {
      drawTarget(mockCtx, baseProps);

      expect(pentagonCoordinates).toHaveBeenCalled();
      expect(triangleCoordinates).toHaveBeenCalled();
      expect(mockCtx.rect).toHaveBeenCalled();
    });

    it("should parse text strings and track custom line heights on multi-line text blocks", () => {
      const textProps: GraphicElement = {
        ...baseProps,
        fontSize: 16,
        fontColor: "green",
        markupText: {
          lineHeight: 1.5,
          content: [
            [
              {
                content: "Hello",
                bold: false,
                italic: false,
              },
              {
                content: "World",
                bold: false,
                italic: false,
              },
            ],
            [
              {
                content: "Vitest",
                bold: false,
                italic: false,
              },
            ],
          ],
          rows: 0,
          cols: 0,
        },
      };

      drawText(mockCtx, textProps);

      expect(mockCtx.font).toBe("16px times");
      expect(mockCtx.fillStyle).toBe("green");
      expect(mockCtx.textBaseline).toBe("top");

      expect(mockCtx.fillText).toHaveBeenCalledWith("Hello World", 10, 20);
      expect(mockCtx.fillText).toHaveBeenCalledWith("Vitest", 10, 44);
    });

    it("should successfully structure custom image elements for shape sides", async () => {
      const mockImageInstance = {
        _src: "",
        set src(value: string) {
          this._src = value;

          if (this.onload) this.onload();
        },
        get src() {
          return this._src;
        },
        onload: null as (() => void) | null,
      };

      vi.stubGlobal("Image", function () {
        return mockImageInstance;
      });

      numberSide(mockCtx, baseProps);

      expect(svgNumberSide).toHaveBeenCalledWith(baseProps);
      expect(mockCtx.drawImage).toHaveBeenCalledWith(
        mockImageInstance,
        10,
        20,
        100,
        200,
      );

      vi.unstubAllGlobals();
    });
  });
});
