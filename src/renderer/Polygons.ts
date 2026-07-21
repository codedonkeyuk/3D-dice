export type PolygonPoint = { x: number; y: number };

export const triangleCoordinates = (
  x: number,
  y: number,
  width: number,
  height: number,
): PolygonPoint[] => [
  { x: x + width * 0.5, y },
  { x: x + width, y: y + height },
  { x, y: y + height },
];

export const pentagonCoordinates = (
  x: number,
  y: number,
  width: number,
  height: number,
): PolygonPoint[] => [
  { x: x + width * 0.5, y },
  { x: x + width, y: y + height * 0.35 },
  { x: x + width * 0.8, y: y + height },
  { x: x + width * 0.2, y: y + height },
  { x, y: y + height * 0.35 },
];

export const hexagonCoordinates = (
  x: number,
  y: number,
  width: number,
  height: number,
): PolygonPoint[] => [
  { x: x + width * 0.5, y },
  { x: x + width, y: y + height * 0.25 },
  { x: x + width, y: y + height * 0.75 },
  { x: x + width * 0.5, y: y + height },
  { x, y: y + height * 0.75 },
  { x, y: y + height * 0.25 },
];
