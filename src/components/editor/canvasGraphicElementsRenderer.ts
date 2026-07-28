import { type GraphicElement } from "../../types";

export interface DrawMethods<DrawMethod> {
  square: DrawMethod;
  triangle: DrawMethod;
  pentagon: DrawMethod;
  line: DrawMethod;
  circle: DrawMethod;
  hexagon: DrawMethod;
  target: DrawMethod;
  diceNumberedSide: DrawMethod;
  text: DrawMethod;
}

import {
  drawCircle,
  drawHexagon,
  drawLine,
  drawPentagon,
  drawSquare,
  drawTarget,
  drawTriangle,
  numberSide,
  drawText,
} from "./canvasShapes";
import applyShapeDefaults from "../../renderer/shape/shapeProps";

type CanvasMethod = (
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
) => void;

const DrawCanvasMethods: DrawMethods<CanvasMethod> = {
  square: drawSquare,
  triangle: drawTriangle,
  pentagon: drawPentagon,
  line: drawLine,
  circle: drawCircle,
  hexagon: drawHexagon,
  target: drawTarget,
  diceNumberedSide: numberSide,
  text: drawText,
};

export default function canvasGraphicElementsRenderer(
  elements: GraphicElement[],
  ctx: CanvasRenderingContext2D,
): void {
  elements.forEach((element) => {
    const validElement = applyShapeDefaults(element);
    DrawCanvasMethods[element.type](ctx, validElement);
  });
}
