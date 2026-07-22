export default function generateSvg(
  contents: string,
  width?: number,
  height?: number,
): string {
  return `<svg${width != null ? ` width="${width}"` : ""}${height != null ? ` height="${height}"` : ""} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${contents !== null ? contents : ""}</svg>`;
}
