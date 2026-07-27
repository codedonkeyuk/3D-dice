import { describe, it, expect, beforeEach, vi } from "vitest";
import svgGraphicElementsRenderer from "./svgGraphicElementsRenderer";
import applyShapeDefaults from "../shape/shapeProps";
import {
  drawSvgCircle,
  drawSvgSquare,
  drawSvgTriangle,
  drawSvgText,
} from "./svgShapes";
import type { GraphicElement } from "../../types";

vi.mock("../shape/shapeProps", () => ({
  default: vi.fn((el: any) => ({ ...el, x: el.x ?? 0, y: el.y ?? 0 })),
}));

vi.mock("./svgShapes", () => ({
  drawSvgSquare: vi.fn((el: any) => `<square id="${el.id}"/>`),
  drawSvgTriangle: vi.fn((el: any) => `<triangle id="${el.id}"/>`),
  drawSvgPentagon: vi.fn((el: any) => `<pentagon id="${el.id}"/>`),
  drawSvgLine: vi.fn((el: any) => `<line id="${el.id}"/>`),
  drawSvgCircle: vi.fn((el: any) => `<circle id="${el.id}"/>`),
  drawSvgHexagon: vi.fn((el: any) => `<hexagon id="${el.id}"/>`),
  drawSvgTarget: vi.fn((el: any) => `<target id="${el.id}"/>`),
  svgNumberSide: vi.fn((el: any) => `<number id="${el.id}"/>`),
  drawSvgText: vi.fn((el: any) => `<text id="${el.id}"/>`),
}));

describe("svgGraphicElementsRenderer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should process an empty array of elements into an empty string", () => {
    const result = svgGraphicElementsRenderer([]);
    expect(result).toBe("");
  });

  it("should apply property defaults and route to the correct drawing utility based on element type", () => {
    const mockElements: GraphicElement[] = [
      { id: "1", type: "circle" } as unknown as GraphicElement,
    ];

    const result = svgGraphicElementsRenderer(mockElements);

    expect(applyShapeDefaults).toHaveBeenCalledWith(mockElements[0]);

    expect(drawSvgCircle).toHaveBeenCalledTimes(1);
    expect(result).toBe('<circle id="1"/>');
  });

  it("should successfully sequence and stitch multiple different elements into a space-separated layout string", () => {
    const mockElements: GraphicElement[] = [
      { id: "101", type: "square" },
      { id: "102", type: "text" },
      { id: "103", type: "triangle" },
    ] as unknown as GraphicElement[];

    const result = svgGraphicElementsRenderer(mockElements);

    expect(drawSvgSquare).toHaveBeenCalledTimes(1);
    expect(drawSvgText).toHaveBeenCalledTimes(1);
    expect(drawSvgTriangle).toHaveBeenCalledTimes(1);

    expect(result).toBe(
      '<square id="101"/> <text id="102"/> <triangle id="103"/>',
    );
  });

  it("should pass all supported drawing primitive types down safely without lookup failures", () => {
    const types: Array<keyof typeof import("./svgShapes") | string> = [
      "square",
      "triangle",
      "pentagon",
      "line",
      "circle",
      "hexagon",
      "target",
      "diceNumberedSide",
      "text",
    ];

    const mockElements = types.map((type, idx) => ({
      id: `${idx}`,
      type,
    })) as unknown as GraphicElement[];

    expect(() => svgGraphicElementsRenderer(mockElements)).not.toThrow();
  });
});
