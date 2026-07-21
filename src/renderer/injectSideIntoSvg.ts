import arrayBufferToBlob from "./arrayBufferToBlob";
import blobToDataURL from "./blobToDataURL";
import { type Side, type SideGraphics, type SideImageFile } from "../types";
import generateGraphicsSideSvg from "./generateGraphicsSideSvg";

export default async function injectSideIntoSvg(
  shape: "circle" | "triangle" | "square",
  side: Side,
  width: number,
  height: number,
) {
  if (side.type === "graphics") {
    const graphicsSide = side as SideGraphics;
    if (
      graphicsSide.elements.length !== 0 ||
      graphicsSide.backgroundColor != null ||
      graphicsSide.backgroundColor != null ||
      graphicsSide.borderColor != null ||
      graphicsSide.borderWidth != null
    ) {
      return generateGraphicsSideSvg(shape, graphicsSide, width, height);
    }
    return "";
  }

  const imageFileSide = side as SideImageFile;
  const blob = arrayBufferToBlob(
    imageFileSide.image as ArrayBuffer,
    imageFileSide.mimeType,
  );
  const dataUrl = await blobToDataURL(
    blob,
    imageFileSide.mimeType,
    width,
    height,
  );
  return `<image href="${dataUrl}" x="0" y="0" height="${height}px" width="${width}px"/>`;
}
