import { drawSvgCircle, drawSvgSquare, drawSvgTriangle } from "./svgShapes";
import svgGraphicElementsRenderer from "./svgGraphicElementsRenderer";
import { type SideGraphics } from "../types";

function drawSquareBackground(
  side: SideGraphics,
  width: number,
  height: number,
  borderWidth: number,
) {
  let svgString = "";
  if (side.borderColor != null) {
    svgString += drawSvgSquare({
      id: 0,
      description: "border",
      x: 0,
      y: 0,
      width,
      height,
      rotate: 0,
      type: "square",
      fillColor: side.borderColor,
    });
  }

  if (side.backgroundColor != null) {
    svgString += drawSvgSquare({
      id: 0,
      description: "content",
      x: borderWidth,
      y: borderWidth,
      width: width - borderWidth * 2,
      height: height - borderWidth * 2,
      rotate: 0,
      type: "square",
      fillColor: side.backgroundColor,
    });
  }
  return svgString;
}

function drawCircleBackground(
  side: SideGraphics,
  width: number,
  height: number,
  borderWidth: number,
) {
  let svgString = "";
  if (side.borderColor != null) {
    svgString += drawSvgCircle({
      id: 0,
      description: "border",
      x: 0,
      y: 0,
      width,
      height,
      rotate: 0,
      type: "circle",
      fillColor: side.borderColor,
    });
  }

  if (side.backgroundColor != null) {
    svgString += drawSvgCircle({
      id: 0,
      description: "content",
      x: borderWidth,
      y: borderWidth,
      width: width - borderWidth * 2,
      height: height - borderWidth * 2,
      rotate: 0,
      type: "circle",
      fillColor: side.backgroundColor,
    });
  }
  return svgString;
}

function drawTriangleBackground(
  side: SideGraphics,
  width: number,
  height: number,
  borderWidth: number,
) {
  let svgString = "";
  if (side.borderColor != null) {
    svgString += drawSvgTriangle({
      id: 0,
      description: "border",
      x: 0,
      y: 0,
      width,
      height,
      rotate: 0,
      type: "triangle",
      fillColor: side.borderColor,
    });
  }

  if (side.backgroundColor != null) {
    svgString += drawSvgTriangle({
      id: 0,
      description: "content",
      x: borderWidth,
      y: borderWidth,
      width: width - borderWidth * 2,
      height: height - borderWidth * 2,
      rotate: 0,
      type: "triangle",
      fillColor: side.backgroundColor,
    });
  }
  return svgString;
}

export default async function generateGraphicsSideSvg(
  shape: "circle" | "triangle" | "square",
  side: SideGraphics,
  width: number,
  height: number,
) {
  const borderWidth = side.borderWidth == null ? 0 : side.borderWidth;
  let svgString = "";
  if (shape === "square") {
    svgString += drawSquareBackground(side, width, height, borderWidth);
  }

  if (shape === "circle") {
    svgString += drawCircleBackground(side, width, height, borderWidth);
  }

  if (shape === "triangle") {
    svgString += drawTriangleBackground(side, width, height, borderWidth);
  }

  if (side.elements.length > 0) {
    svgString += `<svg x="${borderWidth}" y="${borderWidth}">${svgGraphicElementsRenderer(side.elements)}</svg>`;
  }

  return svgString;
}
