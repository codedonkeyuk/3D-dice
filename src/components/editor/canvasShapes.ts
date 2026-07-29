import { type BasicElement, type GraphicElement } from "../../types";
import {
  hexagonCoordinates,
  pentagonCoordinates,
  type PolygonPoint,
  triangleCoordinates,
} from "../../renderer/shape/Polygons";
import { svgNumberSide } from "../../renderer/svg/svgShapes";

function start(ctx: CanvasRenderingContext2D, props: GraphicElement) {
  if (props.fillColor != null) {
    ctx.fillStyle = props.fillColor;
  }
  if (props.strokeColor != null) {
    ctx.strokeStyle = props.strokeColor;
  }
  if (props.strokeColor != null) {
    ctx.strokeStyle = props.strokeColor;
  }
  if (props.strokeWidth != null) {
    ctx.lineWidth = props.strokeWidth;
  }
  ctx.save();
  ctx.translate(props.x + props.width * 0.5, props.y + props.height * 0.5);
  ctx.rotate(props.rotate * (Math.PI / 180));
  ctx.beginPath();
}

function end(ctx: CanvasRenderingContext2D, props: GraphicElement) {
  if (props.strokeWidth) ctx.stroke();
  if (props.fillColor) ctx.fill();
  ctx.restore();
}

function freeDraw(
  ctx: CanvasRenderingContext2D,
  points: PolygonPoint[],
  xModify = 0,
  yModify = 0,
) {
  ctx.moveTo(xModify + points[0].x, yModify + points[0].y);
  for (let i = 0; i < points.length; i += 1) {
    ctx.lineTo(xModify + points[i].x, yModify + points[i].y);
  }
}

function drawCanvasPolygon(
  ctx: CanvasRenderingContext2D,
  points: PolygonPoint[],
) {
  freeDraw(ctx, points);
  ctx.lineTo(points[0].x, points[0].y);
}

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
): void {
  const strokeWidth = props.strokeWidth !== undefined ? props.strokeWidth : 0;
  start(ctx, props);
  ctx.rect(
    0 - props.width * 0.5,
    0 - props.height * 0.5,
    props.width - strokeWidth,
    props.height - strokeWidth,
  );
  end(ctx, props);
}

export function drawTriangle(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
): void {
  start(ctx, props);
  drawCanvasPolygon(
    ctx,
    triangleCoordinates(
      0 - props.width * 0.5,
      0 - props.height * 0.5,
      props.width,
      props.height,
    ),
  );
  end(ctx, props);
  ctx.restore();
}

export function drawPentagon(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
): void {
  start(ctx, props);
  drawCanvasPolygon(
    ctx,
    pentagonCoordinates(
      0 - props.width * 0.5,
      0 - props.height * 0.5,
      props.width,
      props.height,
    ),
  );
  end(ctx, props);
}

export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
): void {
  start(ctx, props);
  drawCanvasPolygon(
    ctx,
    hexagonCoordinates(
      0 - props.width * 0.5,
      0 - props.height * 0.5,
      props.width,
      props.height,
    ),
  );
  end(ctx, props);
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
): void {
  if (props.coOrds != null) {
    ctx.beginPath();
    if (props.fillColor) {
      ctx.fillStyle = props.fillColor;
    }
    if (props.strokeColor) {
      ctx.strokeStyle = props.strokeColor;
    }
    if (props.strokeWidth) {
      ctx.lineWidth = props.strokeWidth;
    }
    ctx.setLineDash([]);
    freeDraw(ctx, props.coOrds, props.x, props.y);
    ctx.stroke();
  }
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
) {
  start(ctx, props);
  ctx.arc(0, 0, props.width * 0.5, 0, 2 * Math.PI);
  end(ctx, props);
}

export function drawTarget(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height }: GraphicElement,
) {
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
  drawPentagon(ctx, targetProps);
  drawTriangle(ctx, { ...targetProps, type: "triangle" });
  drawSquare(ctx, { ...targetProps, type: "square" });
}

function drawImage(
  ctx: CanvasRenderingContext2D,
  props: BasicElement,
  imageUrl: string,
) {
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, props.x, props.y, props.width, props.height);
  };
  img.src = imageUrl;
}

export function numberSide(
  ctx: CanvasRenderingContext2D,
  props: GraphicElement,
) {
  const svg = `data:image/svg+xml;utf8,${encodeURIComponent(svgNumberSide(props))}`;
  drawImage(ctx, props, svg);
}

export function drawText(ctx: CanvasRenderingContext2D, props: GraphicElement) {
  if (props.markupText != null) {
    ctx.save();
    ctx.font = `${props.fontSize}px times`;
    ctx.fillStyle = props.fontColor as string;
    ctx.textBaseline = "top";
    const { markupText } = props;
    markupText.content.forEach((line, idx) => {
      const fontSize = props.fontSize == null ? 20 : props.fontSize;
      const posY =
        props.y + ((markupText.lineHeight * fontSize) as number) * idx;
      const text: string = line.map((word) => word.content).join(" ");
      ctx.fillText(text, props.x, posY);
    });
    ctx.restore();
  }
}
