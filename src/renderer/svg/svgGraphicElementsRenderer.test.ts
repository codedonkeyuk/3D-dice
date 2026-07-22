import svgGraphicElementsRenderer from "./svgGraphicElementsRenderer"; // Adjust path as needed
import applyShapeDefaults from "../shape/shapeProps";
import {
  drawSvgCircle,
  drawSvgSquare,
  drawSvgTriangle,
  drawSvgText,
} from "./svgShapes";
import { type GraphicElement } from "../../types";

jest.mock("../shape/shapeProps", () =>
  jest.fn((el) => ({ ...el, x: el.x ?? 0, y: el.y ?? 0 })),
);

jest.mock("./svgShapes", () => ({
  drawSvgSquare: jest.fn((el) => `<square id="${el.id}"/>`),
  drawSvgTriangle: jest.fn((el) => `<triangle id="${el.id}"/>`),
  drawSvgPentagon: jest.fn((el) => `<pentagon id="${el.id}"/>`),
  drawSvgLine: jest.fn((el) => `<line id="${el.id}"/>`),
  drawSvgCircle: jest.fn((el) => `<circle id="${el.id}"/>`),
  drawSvgHexagon: jest.fn((el) => `<hexagon id="${el.id}"/>`),
  drawSvgTarget: jest.fn((el) => `<target id="${el.id}"/>`),
  svgNumberSide: jest.fn((el) => `<number id="${el.id}"/>`),
  drawSvgText: jest.fn((el) => `<text id="${el.id}"/>`),
}));

describe("svgGraphicElementsRenderer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
