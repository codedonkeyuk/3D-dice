import generateGraphicsSideSvg from "./generateGraphicsSideSvg";
import { drawSvgCircle, drawSvgSquare, drawSvgTriangle } from "./svgShapes";
import svgGraphicElementsRenderer from "./svgGraphicElementsRenderer";
import { type SideGraphics } from "../../types";

jest.mock("./svgShapes", () => ({
  drawSvgSquare: jest.fn(
    (props) =>
      `[SQUARE:${props.description}:x=${props.x},w=${props.width},f=${props.fillColor}]`,
  ),
  drawSvgCircle: jest.fn(
    (props) =>
      `[CIRCLE:${props.description}:x=${props.x},w=${props.width},f=${props.fillColor}]`,
  ),
  drawSvgTriangle: jest.fn(
    (props) =>
      `[TRIANGLE:${props.description}:x=${props.x},w=${props.width},f=${props.fillColor}]`,
  ),
}));

jest.mock("./svgGraphicElementsRenderer", () =>
  jest.fn((elements) => `[RENDERED_ELEMENTS_COUNT:${elements.length}]`),
);

describe("generateGraphicsSideSvg", () => {
  let mockSide: SideGraphics;
  const width = 200;
  const height = 200;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSide = {
      borderColor: "#000000",
      backgroundColor: "#ffffff",
      borderWidth: 10,
      elements: [],
    } as unknown as SideGraphics;
  });

  it("should correctly render a square background with full border dimensions and offsets", async () => {
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

  it("should correctly branch and render circle shapes", async () => {
    await generateGraphicsSideSvg("circle", mockSide, width, height);
    expect(drawSvgCircle).toHaveBeenCalledTimes(2);
    expect(drawSvgSquare).not.toHaveBeenCalled();
  });

  it("should correctly branch and render triangle shapes", async () => {
    await generateGraphicsSideSvg("triangle", mockSide, width, height);
    expect(drawSvgTriangle).toHaveBeenCalledTimes(2);
    expect(drawSvgSquare).not.toHaveBeenCalled();
  });

  it("should gracefully omit border or content rendering if property properties are null", async () => {
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

  it("should default borderWidth to 0 if left null or undefined", async () => {
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

  it("should append a nested SVG wrapper if child element lists are present", async () => {
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
