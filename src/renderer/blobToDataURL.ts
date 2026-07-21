import { type MimeType } from "../types";

export default async function blobToDataURL(
  blob: Blob,
  mimeType: MimeType,
  width: number,
  height: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      canvas.height = height;
      canvas.width = width;
      ctx.drawImage(img, 0, 0, width, height);
      const dataURL = canvas.toDataURL(mimeType);
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
    const objectURL = URL.createObjectURL(blob);
    img.src = objectURL;
  });
}
