import { describe, it, expect, vi, beforeEach } from "vitest";
import dicePolygonRenderer3D, { generateD10MeshMaterial } from "./dicePolygonRenderer3D"; // Adjust path

vi.mock("./svg/generateSvg", () => ({
  default: vi.fn((content, w, h) => `<svg width="${w}" height="${h}">${content}</svg>`),
}));

vi.mock("./shape/castPiece", () => ({
  get3dTemplate: vi.fn(() => ({
    mesh: {
      material: {
        prism: { html: "<prism-html />", width: 200, height: 200 },
        side: { html: "<side-html />", width: 50, height: 50 }
      },
      sideSlots: [
        {
          sidePosition: { x: 1, y: 2, z: 3 },
          sideRotation: { x: 0, y: 1, z: 0 },
          sideIndex: 0,
          width: 10,
          height: 10
        }
      ]
    },
    numberPositions: {
      5: { x: 10, y: 20, z: 30 }
    }
  })),
}));

vi.mock("./image/stringToBlob", () => ({
  default: vi.fn(() => new Blob(["mock-blob"], { type: "image/svg+xml" })),
}));

vi.mock("./svg/diceMethods", () => ({
  diceStyle: vi.fn((fg, bg) => `<style fg="${fg}" bg="${bg}" />`),
}));

vi.mock("./canvas/canvasCommon", () => ({
  generateFaceUV: vi.fn(() => ["uv1", "uv2"]),
}));

vi.mock("./svg/injectSideIntoSvg", () => ({
  default: vi.fn(async (type, side, w, h) => `<injected-${type} side="${side}" />`),
}));

// 2. Mock Babylon.js classes using constructor functions
const mockSetPosition = vi.fn();
const mockEnableEdgesRendering = vi.fn();

vi.mock("@babylonjs/core/Meshes/meshBuilder", () => ({
  MeshBuilder: {
    CreatePolyhedron: vi.fn(() => ({
      enableEdgesRendering: mockEnableEdgesRendering,
      edgesWidth: 0,
      edgesColor: null,
      material: null
    })),
    CreatePlane: vi.fn(() => ({
      material: null,
      setParent: vi.fn(),
      position: null,
      rotation: null
    })),
  },
}));

vi.mock("@babylonjs/core/Maths/math.vector", () => {
  function MockVector3(this: any, x: number, y: number, z: number) {
    this.x = x; this.y = y; this.z = z;
  }
  return { Vector3: MockVector3 };
});

vi.mock("@babylonjs/core/Maths/math.color", () => {
  function MockColor4(this: any, r: number, g: number, b: number, a: number) {
    this.r = r; this.g = g; this.b = b; this.a = a;
  }
  return { Color4: MockColor4 };
});

vi.mock("@babylonjs/core/Materials/standardMaterial", () => {
  return {
    StandardMaterial: function (this: any) {
      this.backFaceCulling = true;
      this.diffuseTexture = null;
    }
  };
});

vi.mock("@babylonjs/core/Materials/Textures/texture", () => {
  return { Texture: function () {} };
});

describe("Dice Polygon Renderer Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => "blob:http://mock-url");
  });

  describe("generateD10MeshMaterial", () => {
    it("should correctly compile template styles and prism HTML markup into an SVG", () => {
      const mockTemplate = {
        mesh: {
          material: {
            prism: { html: "<prism-html />", width: 150, height: 150 }
          }
        }
      };
      const mockForm = { foregroundColor: "gold", backgroundColor: "purple" };

      const result = generateD10MeshMaterial(mockTemplate as any, mockForm as any);

      expect(result).toContain('fg="gold"');
      expect(result).toContain('bg="purple"');
      expect(result).toContain("<prism-html />");
      expect(result).toContain('width="150"');
    });
  });

  describe("dicePolygonRenderer3D", () => {
    const mockScene = {} as any;

    it("should throw an error if the form does not contain any sides array", async () => {
      const invalidDice = {
        piece: "d10",
        form: { foregroundColor: "white", backgroundColor: "black", sides: null }
      } as any;

      await expect(dicePolygonRenderer3D(mockScene, invalidDice)).rejects.toThrow(
        "There are no sides for this dice"
      );
    });

    it("should create polyhedron mesh, apply styles, and instantiate side planes correctly", async () => {
      const validDice = {
        piece: "d10",
        form: {
          foregroundColor: "white",
          backgroundColor: "black",
          sides: ["one"]
        }
      } as any;

      const result = await dicePolygonRenderer3D(mockScene, validDice);

      expect(result.mesh).toBeDefined();
      expect(result.imageUrl).toBe("blob:http://mock-url");

      expect(mockEnableEdgesRendering).toHaveBeenCalled();
      expect(result.mesh?.edgesWidth).toBe(0.5);
      expect(result.mesh?.edgesColor).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0, a: 1 }));
      expect(result.mesh?.material?.backFaceCulling).toBe(false);
    });

    it("should alter camera positions via the returned changeSide callback context", async () => {
      const validDice = {
        piece: "d10",
        form: { foregroundColor: "white", backgroundColor: "black", sides: ["one"] }
      } as any;
      const mockCamera = { setPosition: mockSetPosition } as any;

      const result = await dicePolygonRenderer3D(mockScene, validDice);
      result.changeSide(mockCamera, 5);

      expect(mockSetPosition).toHaveBeenCalledWith(
        expect.objectContaining({ x: 10, y: 20, z: 30 })
      );
    });
  });
});
