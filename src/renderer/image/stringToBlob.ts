import type { MimeType } from "../../types";

export default function stringToBlob(
  contents: string,
  type: MimeType = "image/svg+xml",
): Blob {
  return new Blob([contents], { type });
}
