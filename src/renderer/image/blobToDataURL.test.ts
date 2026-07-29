import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import blobToDataURL from "./blobToDataURL";
import type { MimeType } from "../../types";

describe("blobToDataURL", () => {
  const mockMimeType = "image/png" as MimeType;

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "mocked-object-url");
    global.URL.revokeObjectURL = vi.fn();

    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(
      "data:image/png;base64,mockData",
    );

    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    if (ctx) {
      vi.spyOn(Object.getPrototypeOf(ctx), "drawImage").mockImplementation(
        () => {},
      );
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should successfully convert a blob to a data URL", async () => {
    vi.spyOn(global, "Image").mockImplementation(function (
      this: HTMLImageElement,
    ) {
      const img = this;

      Object.defineProperty(img, "src", {
        set() {
          setTimeout(() => {
            if (img.onload) {
              img.onload(new Event("load"));
            }
          }, 0);
        },
        configurable: true,
      });

      return img;
    } as any);

    const fakeBlob = new Blob([""], { type: "image/png" });
    const resultPromise = blobToDataURL(fakeBlob, mockMimeType, 100, 100);

    await expect(resultPromise).resolves.toBe("data:image/png;base64,mockData");
  });

  test("should reject the promise when the image fails to load", async () => {
    vi.spyOn(global, "Image").mockImplementation(function (
      this: HTMLImageElement,
    ) {
      const img = this;

      Object.defineProperty(img, "src", {
        set() {
          setTimeout(() => {
            if (img.onerror) {
              img.onerror(
                new ErrorEvent("error", { message: "Image load failed" }),
              );
            }
          }, 0);
        },
        configurable: true,
      });

      return img;
    } as any);

    const fakeBlob = new Blob([""], { type: "image/png" });
    const resultPromise = blobToDataURL(fakeBlob, mockMimeType, 100, 100);

    await expect(resultPromise).rejects.toThrow("Image load failed");
  });
});
