import { describe, it, expect, beforeEach, vi } from "vitest";

import {
  drawSvgSquare,
  drawSvgTriangle,
  drawSvgPentagon,
  drawSvgHexagon,
  drawSvgLine,
  drawSvgCircle,
  drawSvgTarget,
  svgNumberSide,
  drawSvgText,
} from "./svgShapes";
import applyShapeDefaults from "../shape/shapeProps";
import {
  triangleCoordinates,
  pentagonCoordinates,
  hexagonCoordinates,
} from "../shape/Polygons";
import type { GraphicElement } from "../../types";

vi.mock("../shape/shapeProps", () => ({
  default: vi.fn((props: any) => ({ ...props, x: props.x ?? 0, y: props.y ?? 0 })),
}));

vi.mock("../shape/Polygons", () => ({
  triangleCoordinates: vi.fn(() => [
    { x: 10, y: 10 },
    { x: 20, y: 30 },
  ]),
  pentagonCoordinates: vi.fn(() => [
    { x: 5, y: 5 },
    { x: 15, y: 25 },
  ]),
  hexagonCoordinates: vi.fn(() => [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ]),
}));

describe("svgShapes drawing utilities", () => {
  let baseElement: GraphicElement;

  beforeEach(() => {
    vi.clearAllMocks();
    baseElement = {
      id: "el-1",
      description: "test",
      type: "square",
      x: 10,
      y: 20,
      width: 100,
      height: 100,
      fillColor: "#ffffff",
      strokeColor: "#000000",
      strokeWidth: 4,
      rotate: 45,
    } as unknown as GraphicElement;
  });

  describe("drawSvgSquare", () => {
    it("should assemble a valid rect tag applying correct defaults and styling definitions", () => {
      const result = drawSvgSquare(baseElement);

      expect(applyShapeDefaults).toHaveBeenCalledWith(baseElement);
      expect(result).toContain("<rect");
      expect(result).toContain('x="10"');
      expect(result).toContain('y="20"');
      expect(result).toContain('width="100"');
      expect(result).toContain('height="100"');

      expect(result).toContain(
        'style="stroke-width: 4; fill: #ffffff; stroke: #000000;; transform-box: fill-box; transform-origin: center;  transform: rotate(45deg);\"',
      );
    });
  });

  describe("Polygon Draw Methods (Triangle, Pentagon, Hexagon)", () => {
    it("should coordinate mappings and map points for drawSvgTriangle", () => {
      const result = drawSvgTriangle(baseElement);
      expect(triangleCoordinates).toHaveBeenCalledWith(10, 20, 100, 100);
      expect(result).toContain("<polygon");
      expect(result).toContain('points="10,10 20,30"');
    });

    it("should coordinate mappings and map points for drawSvgPentagon", () => {
      const result = drawSvgPentagon(baseElement);
      expect(pentagonCoordinates).toHaveBeenCalledWith(10, 20, 100, 100);
      expect(result).toContain('points="5,5 15,25"');
    });

    it("should coordinate mappings and map points for drawSvgHexagon", () => {
      const result = drawSvgHexagon(baseElement);
      expect(hexagonCoordinates).toHaveBeenCalledWith(10, 20, 100, 100);
      expect(result).toContain('points="1,1 2,2"');
    });
  });

  describe("drawSvgLine", () => {
    it("should construct a polyline and calculate offsets across coordinates", () => {
      const lineElement = {
        ...baseElement,
        coOrds: [
          { x: 5, y: 5 },
          { x: 25, y: 35 },
        ],
      };
      const result = drawSvgLine(lineElement);

      expect(result).toContain("<polyline");
      expect(result).toContain('points="15,25 35,55"');
      expect(result).toContain("fill: none;");
    });

    it("should compile an empty points mapping when coordinate lists are null", () => {
      const result = drawSvgLine({ ...baseElement, coOrds: undefined });
      expect(result).toContain('points=""');
    });
  });

  describe("drawSvgCircle", () => {
    it("should translate radius calculations and origin offsets", () => {
      const result = drawSvgCircle(baseElement);

      expect(result).toContain('cx="60"');
      expect(result).toContain('cy="70"');
      expect(result).toContain('r="50"');
      expect(result).toContain('class="content"');
    });
  });

  describe("drawSvgTarget", () => {
    it("should construct a target compound structure grouping multiple shape primitives", () => {
      const result = drawSvgTarget(baseElement);

      expect(result).toContain("<polygon");
      expect(result).toContain("<rect");
    });
  });

  describe("svgNumberSide", () => {
    it("should generate a baseline text layout wrapping content parameter fields", () => {
      const result = svgNumberSide({
        ...baseElement,
        id: "num-id",
        content: "5",
        fontSize: 24,
      });

      expect(result).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
      expect(result).toContain('font-size="24"');

      expect(result).toMatch(/>\s*5\s*<\/text>/);
    });

    it("should automatically append period indicators for safety visibility on number values 6 and 9", () => {
      const resultSix = svgNumberSide({ ...baseElement, content: "6" });
      expect(resultSix).toMatch(/>\s*6\.\s*<\/text>/);

      const resultNine = svgNumberSide({ ...baseElement, content: "9" });
      expect(resultNine).toMatch(/>\s*9\.\s*<\/text>/);
    });
  });

  describe("drawSvgText", () => {
    it("should loop down markup text segments rendering multiline content with layout offsets", () => {
      const textElement = {
        id: "txt-1",
        x: 15,
        y: 30,
        fontSize: 16,
        fontColor: "blue",
        markupText: {
          lineHeight: 1.5,
          content: [
            [{ content: "Hello" }, { content: "World" }],
            [{ content: "Line" }, { content: "Two" }],
          ],
        },
      } as unknown as GraphicElement;

      const result = drawSvgText(textElement);

      expect(result).toContain('x="15"');
      expect(result).toContain('y="30"');
      expect(result).toContain('y="54"');
      expect(result).toContain('fill="blue"');

      expect(result).toMatch(/>\s*Hello World\s*<\/text>/);
      expect(result).toMatch(/>\s*Line Two\s*<\/text>/);
    });

    it("should safely evaluate into an empty layout collection if markup configurations are missing", () => {
      const result = drawSvgText({ ...baseElement, markupText: undefined });
      expect(result).toBe("");
    });
  });
});
