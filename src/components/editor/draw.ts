import { type GraphicElement } from "../../types";
import { type DragXyType } from "./types";

export default function generateDrawGraphics(
  xy: DragXyType[],
  strokeColor: string,
  strokeWidth: number,
): GraphicElement {
  let lowestX = Infinity;
  let lowestY = Infinity;
  let highestX = 0;
  let highestY = 0;
  xy.forEach(({ touchOne: element }) => {
    lowestX = element.x < lowestX ? element.x : lowestX;
    lowestY = element.y < lowestY ? element.y : lowestY;
    highestX = element.x > highestX ? element.x : highestX;
    highestY = element.y > highestY ? element.y : highestY;
  });

  const newXy = xy.map(({ touchOne: element }) => ({
    x: element.x - lowestX,
    y: element.y - lowestY,
  }));

  return {
    id: 0,
    description: "A drawing of a line",
    x: lowestX,
    y: lowestY,
    width: highestX - lowestX,
    height: highestY - lowestY,
    rotate: 0,
    type: "line",
    strokeColor,
    strokeWidth,
    coOrds: newXy,
  };
}
