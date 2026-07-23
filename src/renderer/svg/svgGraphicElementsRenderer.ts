import type { GraphicElement, DrawMethods } from "../../types";
import applyShapeDefaults from "../shape/shapeProps";
import {
  drawSvgCircle,
  drawSvgHexagon,
  drawSvgLine,
  drawSvgPentagon,
  drawSvgSquare,
  drawSvgTarget,
  drawSvgTriangle,
  svgNumberSide,
  drawSvgText,
} from "./svgShapes";

type SvgMethod = (graphicElement: GraphicElement) => string;

const DrawSvgMethods: DrawMethods<SvgMethod> = {
  square: drawSvgSquare,
  triangle: drawSvgTriangle,
  pentagon: drawSvgPentagon,
  line: drawSvgLine,
  circle: drawSvgCircle,
  hexagon: drawSvgHexagon,
  target: drawSvgTarget,
  diceNumberedSide: svgNumberSide,
  text: drawSvgText,
};

export default function svgGraphicElementsRenderer(elements: GraphicElement[]) {
  return elements
    .map((element) => {
      const validElement = applyShapeDefaults(element);
      return DrawSvgMethods[element.type](validElement);
    })
    .join(" ");
}
