import arrayBufferToBlob from "./arrayBufferToBlob";

describe("arrayBufferToBlob", () => {
  const mockBuffer = new ArrayBuffer(10);

  it("should return a Blob with the default MIME type 'image/svg+xml'", () => {
    const blob = arrayBufferToBlob(mockBuffer);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("image/svg+xml");
  });

  it("should return a Blob with the specified custom MIME type", () => {
    const customType = "image/png";
    const blob = arrayBufferToBlob(mockBuffer, customType);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe(customType);
  });

  it("should create a Blob with the correct size", () => {
    const largeBuffer = new ArrayBuffer(1024);
    const blob = arrayBufferToBlob(largeBuffer);

    expect(blob.size).toBe(1024);
  });

  it("should correctly handle different buffer sizes", () => {
    const smallBuffer = new ArrayBuffer(5);
    const blob = arrayBufferToBlob(smallBuffer);

    expect(blob.size).toBe(5);
  });
});
