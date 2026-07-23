import stringToBlob from "./stringToBlob";
import type { MimeType } from "../../types";

describe("stringToBlob", () => {
  it("should create a Blob with default mime type if none is provided", () => {
    const textContents = "<svg><circle cx='50' cy='50' r='40'/></svg>";

    const result = stringToBlob(textContents);

    expect(result).toBeInstanceOf(Blob);

    expect(result.type).toBe("image/svg+xml");
    expect(result.size).toBe(textContents.length);
  });

  it("should respect a custom mime type when provided", () => {
    const jsonContents = JSON.stringify({ hello: "world" });
    const customMime: MimeType = "image/png";

    const result = stringToBlob(jsonContents, customMime);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("image/png");
    expect(result.size).toBe(jsonContents.length);
  });

  it("should handle empty string inputs cleanly", () => {
    const emptyResult = stringToBlob("");

    expect(emptyResult.size).toBe(0);
    expect(emptyResult.type).toBe("image/svg+xml");
  });
});
