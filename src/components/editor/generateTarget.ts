import { type GraphicElement, type TargetElement } from "../../types";

const generateTarget = ({
  x,
  y,
  width,
  height,
  rotate,
  directional,
}: TargetElement): GraphicElement[] => [
  {
    id: `0`,
    description: "target",
    type: "circle",
    fillColor: "black",
    strokeColor: "black",
    strokeWidth: 0,
    x,
    y,
    width,
    height,
    rotate,
  },
  {
    id: `0`,
    description: "target",
    type: "circle",
    fillColor: "yellow",
    strokeColor: "black",
    strokeWidth: 0,
    x: x + width * 0.125,
    y: y + height * 0.125,
    width: width * 0.75,
    height: height * 0.75,
    rotate,
  },
  {
    id: `0`,
    description: "target",
    type: directional ? "triangle" : "circle",
    fillColor: "black",
    strokeWidth: 0,
    x: x + width * 0.375,
    y: y + height * 0.375,
    width: width * 0.25,
    height: height * 0.25,
    rotate,
  },
];

export default generateTarget;
