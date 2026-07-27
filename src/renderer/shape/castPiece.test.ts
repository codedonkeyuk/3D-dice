import { describe, it, expect } from "vitest";
import { get3dTemplate } from "./castPiece";
import type { ModelPiece, TemplateOpenGl } from "../../types";

describe("get3dTemplate", () => {
  it("should return the OpenGl template when present", () => {
    const mock_template: TemplateOpenGl = {
      numberPositions: [],
      mesh: {
        vertex: [],
        face: [],
        sideSlots: [],
        material: {
          prism: {
            html: "",
            width: 0,
            height: 0,
          },
          side: {
            html: "",
            width: 0,
            height: 0,
          },
        },
      },
    };
    const piece: ModelPiece = {
      modelId: "sd",
      renderType: "mesh",
      metalic: false,
      transparent: false,
      template: {
        OpenGl: mock_template,
      },
    };

    const result = get3dTemplate(piece);
    expect(result).toBe(mock_template);
  });

  it("should throw an error if the OpenGl template is missing", () => {
    const piece: ModelPiece = {
      modelId: "sd",
      renderType: "mesh",
      metalic: false,
      transparent: false,
      template: undefined,
    };

    expect(() => get3dTemplate(piece)).toThrow("Missing openGl template");
  });
});
