import { type MimeType } from "../../types";

export default function arrayBufferToBlob(
  buffer: ArrayBuffer,
  type: MimeType = "image/svg+xml",
): Blob {
  return new Blob([buffer], { type });
}
