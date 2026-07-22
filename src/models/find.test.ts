import { findDice } from "./find";
import type { CategoryRecord, ModelPiece, SideGraphics } from "../types";

jest.mock("@babylonjs/core/Cameras/arcRotateCamera", () => ({}), {
  virtual: true,
});
jest.mock("@babylonjs/core/scene", () => ({}), { virtual: true });
jest.mock("@babylonjs/core/Meshes/mesh", () => ({}), { virtual: true });

jest.mock("@babylonjs/core/Misc/tools", () => ({
  Tools: {
    ToRadians: (degrees: number) => (degrees * Math.PI) / 180,
  },
}));

jest.mock("./index", () => {
  const mockBlankDice: CategoryRecord<ModelPiece, SideGraphics> = {
    id: "blank-dice-d6",
    name: "Blank Dice D6",
    description: "Create a new dice.",
    category: "dice",
    subCategory: "D6",
    readOnly: false,
    form: {
      type: "dice-setup",
      thumbnail: "data:image/svg+xml;utf8,...",
      sides: [
        { type: "graphics", systemElements: [], elements: [] },
        { type: "graphics", systemElements: [], elements: [] },
        { type: "graphics", systemElements: [], elements: [] },
        { type: "graphics", systemElements: [], elements: [] },
        { type: "graphics", systemElements: [], elements: [] },
        { type: "graphics", systemElements: [], elements: [] },
      ],
    },
    piece: {
      modelId: "blank-dice-d6",
      metalic: false,
      transparent: false,
      renderType: "mesh",
      template: {
        OpenGl: {
          numberPositions: [
            { x: 2.99, y: -0.004, z: 0.012 },
            { x: 0.0, y: -2.999, z: 0.029 },
          ],
          mesh: {
            vertex: [
              [-1, -1, -1],
              [1, -1, -1],
            ],
            face: [[0, 1, 2, 3]],
            sideSlots: [
              {
                sidePosition: { x: 0.5, y: 0, z: 0 }, // Mimics radian output
                sideRotation: { x: 0, y: -1.57, z: 0 },
                sideIndex: 0,
                width: 1,
                height: 1,
              },
            ],
            material: {
              prism: { html: "<rect />", width: 1024, height: 1024 },
              side: { html: "<rect />", width: 512, height: 512 },
            },
          },
        },
      },
    },
  };

  return {
    __esModule: true,
    default: [mockBlankDice],
  };
});

describe("finddice utility", () => {
  it("should successfully find and return a dice by its ID", () => {
    const result = findDice("blank-dice-d6");

    expect(result).toBeDefined();
    expect(result?.id).toBe("blank-dice-d6");
    expect(result?.name).toBe("Blank Dice D6");
  });

  it("should contain the structured template mesh dimensions and layout arrays", () => {
    const result = findDice("blank-dice-d6");
    const openGlTemplate = result?.piece.template?.OpenGl;

    expect(openGlTemplate?.numberPositions).toBeDefined();
    expect(openGlTemplate?.mesh.sideSlots[0].width).toBe(1);
    if (openGlTemplate && "material" in openGlTemplate.mesh) {
      expect(openGlTemplate.mesh.material.prism.width).toBe(1024);
    } else {
      fail("Expected mesh to contain a material property");
    }
  });

  it("should safely return undefined if the ID does not match any dice", () => {
    const result = findDice("non-existent-id");

    expect(result).toBeUndefined();
  });

  it("should safely return undefined when given an empty string ID", () => {
    const result = findDice("");

    expect(result).toBeUndefined();
  });
});
