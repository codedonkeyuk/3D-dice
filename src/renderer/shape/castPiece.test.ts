import { get3dTemplate } from "./castPiece";
import type { ModelPiece, TemplateOpenGl } from "../../types";

describe("get3dTemplate", () => {
  it("should return the OpenGL template when it exists on the piece", () => {
    const mockOpenGlTemplate: TemplateOpenGl = {} as unknown as TemplateOpenGl;

    const mockPiece: ModelPiece = {
      template: {
        OpenGl: mockOpenGlTemplate,
      },
    } as unknown as ModelPiece;

    const result = get3dTemplate(mockPiece);

    expect(result).toBe(mockOpenGlTemplate);
  });

  it("should throw an error if the template object is completely missing", () => {
    const mockPiece = {} as unknown as ModelPiece;

    expect(() => get3dTemplate(mockPiece)).toThrow("Missing openGl template");
  });

  it("should throw an error if template exists but OpenGl properties inside it are null or undefined", () => {
    const mockPieceNull = {
      template: {
        OpenGl: null,
      },
    } as unknown as ModelPiece;

    const mockPieceUndefined = {
      template: {
        OpenGl: undefined,
      },
    } as unknown as ModelPiece;

    expect(() => get3dTemplate(mockPieceNull)).toThrow(
      "Missing openGl template",
    );
    expect(() => get3dTemplate(mockPieceUndefined)).toThrow(
      "Missing openGl template",
    );
  });
});
