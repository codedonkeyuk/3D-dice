import { describe, test, expect, vi, beforeEach } from "vitest";
import generateGraphicsSideSvg from "./generateGraphicsSideSvg";
import { drawSvgCircle, drawSvgSquare, drawSvgTriangle } from "./svgShapes";
import svgGraphicElementsRenderer from "./svgGraphicElementsRenderer";
import type { SideGraphics } from "../../types";

vi.mock("./svgShapes", () => ({
  drawSvgSquare: vi.fn(
    (props) =>
      `[SQUARE:${props.description}:x=${props.x},w=${props.width},f=${props.fillColor}]`,
  ),
  drawSvgCircle: vi.fn(
    (props) =>
      `[CIRCLE:${props.description}:x=${props.x},w=${props.width},f=${props.fillColor}]`,
  ),
  drawSvgTriangle: vi.fn(
    (props) =>
      `[TRIANGLE:${props.description}:x=${props.x},w=${props.width},f=${props.fillColor}]`,
  ),
}));

vi.mock("./svgGraphicElementsRenderer", () => ({
  default: vi.fn((elements) => `[RENDERED_ELEMENTS_COUNT:${elements.length}]`),
}));

describe("generateGraphicsSideSvg", () => {
  let mockSide: SideGraphics;
  const width = 200;
  const height = 200;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSide = {
      borderColor: "#000000",
      backgroundColor: "#ffffff",
      borderWidth: 10,
      elements: [],
    } as unknown as SideGraphics;
  });

  test("should correctly render a square background with full border dimensions and offsets", async () => {
    const result = await generateGraphicsSideSvg(
      "square",
      mockSide,
      width,
      height,
    );

    expect(drawSvgSquare).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "border",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        fillColor: "#000000",
      }),
    );

    expect(drawSvgSquare).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "content",
        x: 10,
        y: 10,
        width: 180,
        height: 180,
        fillColor: "#ffffff",
      }),
    );

    expect(result).toContain("[SQUARE:border:");
    expect(result).toContain("[SQUARE:content:");
  });

  test("should correctly branch and render circle shapes", async () => {
    await generateGraphicsSideSvg("circle", mockSide, width, height);
    expect(drawSvgCircle).toHaveBeenCalledTimes(2);
    expect(drawSvgSquare).not.toHaveBeenCalled();
  });

  test("should correctly branch and render triangle shapes", async () => {
    await generateGraphicsSideSvg("triangle", mockSide, width, height);
    expect(drawSvgTriangle).toHaveBeenCalledTimes(2);
    expect(drawSvgSquare).not.toHaveBeenCalled();
  });

  test("should gracefully omit border or content rendering if property properties are null", async () => {
    mockSide.borderColor = undefined;

    const result = await generateGraphicsSideSvg(
      "square",
      mockSide,
      width,
      height,
    );

    expect(result).not.toContain("border");
    expect(result).toContain("content");
  });

  test("should default borderWidth to 0 if left null or undefined", async () => {
    mockSide.borderWidth = undefined;

    await generateGraphicsSideSvg("square", mockSide, width, height);

    expect(drawSvgSquare).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "content",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      }),
    );
  });

  test("should append a nested SVG wrapper if child element lists are present", async () => {
    mockSide.elements = [{ id: 1, type: "path" }] as any;

    const result = await generateGraphicsSideSvg(
      "square",
      mockSide,
      width,
      height,
    );

    expect(svgGraphicElementsRenderer).toHaveBeenCalledWith(mockSide.elements);

    expect(result).toContain(
      '<svg x="10" y="10">[RENDERED_ELEMENTS_COUNT:1]</svg>',
    );
  });
});
