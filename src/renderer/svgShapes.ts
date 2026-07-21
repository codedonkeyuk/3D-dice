import { type GraphicElement } from "../types";
import applyShapeDefaults from "./shapeProps";
import {
  hexagonCoordinates,
  pentagonCoordinates,
  type PolygonPoint,
  triangleCoordinates,
} from "./Polygons";

type ShapeElement = "rect";
type CssAttribute = "fill" | "stroke" | "stroke-width";

function pointsString(
  points: PolygonPoint[],
  xModify = 0,
  yModify = 0,
): string {
  return points.map(({ x, y }) => `${xModify + x},${yModify + y}`).join(" ");
}

function styleCss(attribute: CssAttribute, value: string | number): string {
  return value === undefined ? "" : `${attribute}: ${value};`;
}

function transform(config: GraphicElement): string {
  const trans: string[] = [];
  if (config.rotate) {
    trans.push(`rotate(${config.rotate}deg)`);
  }
  if (trans.length === 0) {
    return "";
  }
  return `${config.rotate !== 0 ? "transform-box: fill-box; transform-origin: center; " : ""} transform: ${trans.join(" ")};`;
}

const styleString = (config: GraphicElement) =>
  `${styleCss("stroke-width", config.strokeWidth == null ? 0 : config.strokeWidth)} ${config.fillColor == null ? "" : `fill: ${config.fillColor};`} ${styleCss("stroke", config.strokeColor == null ? "" : config.strokeColor)}; ${transform(config)}`;

function drawSvgShape(element: ShapeElement, config: GraphicElement) {
  return `
    <${element}
        x="${config.x}"
        y="${config.y}"
        width="${config.width}"
        height="${config.height}"
        style="${styleString(config)}"
    />`;
}

function drawPolygonShape(points: PolygonPoint[], config: GraphicElement) {
  const pointString = pointsString(points);
  return `
  <polygon
    fill="transparent"
    points="${pointString}" 
    style="${styleString(config)}"
  />
`;
}

export function drawSvgSquare(props: GraphicElement): string {
  const config = applyShapeDefaults(props);
  return drawSvgShape("rect", config);
}

export function drawSvgTriangle(props: GraphicElement): string {
  return drawPolygonShape(
    triangleCoordinates(props.x, props.y, props.width, props.height),
    props,
  );
}

export function drawSvgPentagon(props: GraphicElement): string {
  return drawPolygonShape(
    pentagonCoordinates(props.x, props.y, props.width, props.height),
    props,
  );
}

export function drawSvgHexagon(props: GraphicElement): string {
  return drawPolygonShape(
    hexagonCoordinates(props.x, props.y, props.width, props.height),
    props,
  );
}

export function drawSvgLine(props: GraphicElement): string {
  const pointString =
    props.coOrds == null ? "" : pointsString(props.coOrds, props.x, props.y);

  return `
    <polyline
    fill="none"
    points="${pointString}" 
    style="${styleString({ ...props, fillColor: "none" })}"
  />
  `;
}

export function drawSvgCircle(props: GraphicElement): string {
  const halfWidth = props.width * 0.5;
  return `
    <circle
      class="content"
      cx="${props.x + halfWidth}"
      cy="${props.y + props.height * 0.5}"
      r="${halfWidth}"
    style="${styleString(props)}"
  />
  `;
}

export function drawSvgTarget({ x, y, width, height }: GraphicElement): string {
  const targetProps: GraphicElement = {
    id: "1",
    description: "1",
    rotate: 0,
    type: "pentagon",
    width,
    height,
    x,
    y,
    strokeColor: "green",
    strokeWidth: 2,
  };
  return `
    ${drawSvgPentagon(targetProps)}
    ${drawSvgTriangle({ ...targetProps, type: "triangle" })}
    ${drawSvgSquare({ ...targetProps, type: "square" })}
  `;
}

export function svgNumberSide({
  id,
  content,
  fontSize,
  width,
  height,
}: GraphicElement): string {
  const number = Number.parseInt(content == null ? "" : content, 10);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <text
          id="${id}"
          class="content"
          x="50%"
          y="60%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-size="${fontSize}"
      >
          ${content}${number === 6 || number === 9 ? "." : ""}
      </text>
    </svg>`;
}

export function drawSvgText({
  id,
  fontSize,
  fontColor,
  markupText,
  x,
  y,
}: GraphicElement): string {
  const output: string[] = [];
  if (markupText != null) {
    markupText.content.forEach((line, idx) => {
      const newfontSize = fontSize == null ? 20 : fontSize;
      const posY = y + ((markupText.lineHeight * newfontSize) as number) * idx;
      const text: string = line.map((word) => word.content).join(" ");
      output.push(`
      <text
        id="${id}"
        x="${x}"
        y="${posY}"
        dy="${newfontSize}px"
        font-size="${newfontSize}px"
        fill="${fontColor}"
      >
        ${text}
      </text>`);
    });
  }
  return output.join(" ");
}
