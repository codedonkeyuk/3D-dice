import blobToDataURL from "./blobToDataURL"; // Adjust path as needed
import { type MimeType } from "../../types";

describe("blobToDataURL", () => {
  let mockContext: { drawImage: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();

    (globalThis as any).URL.createObjectURL = jest.fn(() => "blob:mock-url");

    mockContext = {
      drawImage: jest.fn(),
    };

    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue(mockContext);
    HTMLCanvasElement.prototype.toDataURL = jest.fn(
      (type) => `data:${type};base64,mockData`,
    );

    (globalThis as any).Image = class {
      onload: () => void = () => {};
      onerror: (err: any) => void = () => {};
      private _src: string = "";

      set src(value: string) {
        this._src = value;
        setTimeout(() => {
          if (value === "trigger-error") {
            this.onerror(new Error("Image load failed"));
          } else {
            this.onload();
          }
        }, 0);
      }

      get src() {
        return this._src;
      }
    } as any;
  });

  it("should successfully convert a blob to a data URL with correct dimensions", async () => {
    const mockBlob = new Blob([""], { type: "image/png" });
    const mimeType: MimeType = "image/png";
    const width = 100;
    const height = 150;

    const result = await blobToDataURL(mockBlob, mimeType, width, height);

    expect((globalThis as any).URL.createObjectURL).toHaveBeenCalledWith(
      mockBlob,
    );

    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith("2d");
    expect(mockContext.drawImage).toHaveBeenCalledWith(
      expect.any(Object),
      0,
      0,
      width,
      height,
    );

    expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith(
      mimeType,
    );
    expect(result).toBe("data:image/png;base64,mockData");
  });

  it("should reject the promise if the image fails to load", async () => {
    (globalThis as any).URL.createObjectURL = jest.fn(() => "trigger-error");

    const mockBlob = new Blob([""], { type: "image/png" });
    const mimeType: MimeType = "image/png";

    await expect(blobToDataURL(mockBlob, mimeType, 100, 100)).rejects.toThrow(
      "Image load failed",
    );
  });
});
