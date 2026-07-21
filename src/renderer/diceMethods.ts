import { type FormAttribute } from "../types";

type DiceSlotType = {
  x: number;
  y: number;
  content: string;
  width: number;
  height: number;
  rotate?: number;
  skewX?: number;
  skewY?: number;
  translateX?: number;
  translateY?: number;
  scaleX?: number;
  scaleY?: number;
  flip?: boolean;
};

export function diceSlot({
  x,
  y,
  content,
  rotate,
  width,
  height,
  scaleX,
  scaleY,
  skewX,
  skewY,
}: DiceSlotType): string {
  const handleNull = (
    value: string | number | null | undefined,
    alternate = 0,
  ) => (value != null ? value : alternate);
  return `
    <g style="transform-box: fill-box;transform-origin: center;transform: rotate(${rotate}deg)${scaleX != null || scaleY != null ? ` scale(${handleNull(scaleX, 1)}, ${handleNull(scaleY, 1)})` : ""} skew(${handleNull(skewX, 0)}deg, ${handleNull(skewY, 0)}deg);">
    <svg viewBox="0 0 512 512" x="${x}" y="${y}" width="${width}" height="${height}">
      <rect width="512" height="512" style="fill:transparent;stroke-width:10;" />
          ${content}
    </svg>
    </g>
  `;
}

export function diceStyle(fontColor: FormAttribute, color: FormAttribute) {
  return `
    <style>
        .content {
            fill: ${fontColor};
        }
        .background {
          fill: black;
        }
        .side {
          fill: ${color};
        }
      </style>
  `;
}
