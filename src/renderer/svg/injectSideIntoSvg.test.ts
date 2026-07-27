import { vi, describe, it, expect, beforeEach } from "vitest";
import injectSideIntoSvg from "./injectSideIntoSvg";
import arrayBufferToBlob from "../image/arrayBufferToBlob";
import blobToDataURL from "../image/blobToDataURL";
import generateGraphicsSideSvg from "./generateGraphicsSideSvg";
import type { Side } from "../../types";

vi.mock("../image/arrayBufferToBlob", () => ({
  default: vi.fn(),
}));

vi.mock("../image/blobToDataURL", () => ({
  default: vi.fn(),
}));

vi.mock("./generateGraphicsSideSvg", () => ({
  default: vi.fn(),
}));

describe("injectSideIntoSvg", () => {
  const width = 200;
  const height = 200;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when side type is 'graphics'", () => {
    it("should delegate to generateGraphicsSideSvg if graphics side has active elements", async () => {
      const mockSide: Side = {
        type: "graphics",
        elements: [{ id: 1, type: "path" }],
      } as any;

      (
        generateGraphicsSideSvg as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue("<svg>mock-graphics</svg>");

      const result = await injectSideIntoSvg("square", mockSide, width, height);

      expect(generateGraphicsSideSvg).toHaveBeenCalledWith(
        "square",
        mockSide,
        width,
        height,
      );
      expect(result).toBe("<svg>mock-graphics</svg>");
    });

    it("should delegate to generateGraphicsSideSvg if a background color is set", async () => {
      const mockSide: Side = {
        type: "graphics",
        elements: [],
        backgroundColor: "#ffffff",
      } as any;

      await injectSideIntoSvg("circle", mockSide, width, height);
      expect(generateGraphicsSideSvg).toHaveBeenCalledTimes(1);
    });

    it("should delegate to generateGraphicsSideSvg if a border configuration is set", async () => {
      const mockSide: Side = {
        type: "graphics",
        elements: [],
        borderColor: "red",
        borderWidth: 2,
      } as any;

      await injectSideIntoSvg("triangle", mockSide, width, height);
      expect(generateGraphicsSideSvg).toHaveBeenCalledTimes(1);
    });

    it("should safely return an empty string if the graphics side is completely empty", async () => {
      const mockSide: Side = {
        type: "graphics",
        elements: [],
        backgroundColor: null,
        borderColor: null,
        borderWidth: null,
      } as any;

      const result = await injectSideIntoSvg("square", mockSide, width, height);

      expect(generateGraphicsSideSvg).not.toHaveBeenCalled();
      expect(result).toBe("");
    });
  });

  describe("when side type is 'imageFile'", () => {
    it("should run image conversions pipelines and output an SVG image node", async () => {
      const mockArrayBuffer = new ArrayBuffer(8);
      const mockBlob = new Blob([""], { type: "image/png" });
      const mockSide: Side = {
        type: "imageFile",
        image: mockArrayBuffer,
        mimeType: "image/png",
      } as any;

      (
        arrayBufferToBlob as unknown as ReturnType<typeof vi.fn>
      ).mockReturnValue(mockBlob);
      (blobToDataURL as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
        "data:image/png;base64,mockedDataUrl",
      );

      const result = await injectSideIntoSvg("square", mockSide, width, height);

      expect(arrayBufferToBlob).toHaveBeenCalledWith(
        mockArrayBuffer,
        "image/png",
      );
      expect(blobToDataURL).toHaveBeenCalledWith(
        mockBlob,
        "image/png",
        width,
        height,
      );

      expect(result).toBe(
        '<image href="data:image/png;base64,mockedDataUrl" x="0" y="0" height="200px" width="200px"/>',
      );
    });
  });
});
