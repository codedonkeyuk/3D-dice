import { describe, it, expect, vi, beforeEach } from "vitest";
import dicePlaneRenderer3D, {
  generateD2MeshMaterial,
} from "./dicePlaneRenderer3D"; // Adjusted to match your log path

vi.mock("./svg/generateSvg", () => ({
  default: vi.fn(
    (content, w, h) => `<svg width="${w}" height="${h}">${content}</svg>`,
  ),
}));

vi.mock("./svg/svgGraphicElementsRenderer", () => ({
  default: vi.fn((elements) => `<elements>${elements.join(",")}</elements>`),
}));

vi.mock("./shape/castPiece", () => ({
  get3dTemplate: vi.fn(() => ({
    mesh: {
      html: "<mesh-html />",
      width: 100,
      height: 100,
      frontUvs: { x: 0, y: 0, z: 0.5, w: 1 },
      backUvs: { x: 0.5, y: 0, z: 1, w: 1 },
      sideSlots: [
        {
          x: 10,
          y: 20,
          rotate: 0,
          width: 50,
          height: 50,
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
        },
      ],
    },
    numberPositions: {
      1: { x: 0, y: 5, z: 10 },
    },
  })),
}));

vi.mock("./image/stringToBlob", () => ({
  default: vi.fn(() => new Blob(["mock-blob"], { type: "image/svg+xml" })),
}));

vi.mock("./svg/diceMethods", () => ({
  diceSlot: vi.fn((cfg) => `<slot x="${cfg.x}">${cfg.content}</slot>`),
  diceStyle: vi.fn((fg, bg) => `<style fg="${fg}" bg="${bg}" />`),
}));

// 2. Mock Babylon.js classes using valid constructor structures
const mockSetPosition = vi.fn();

vi.mock("@babylonjs/core/Meshes/meshBuilder", () => ({
  MeshBuilder: {
    CreatePlane: vi.fn(() => ({ material: null })),
  },
}));

vi.mock("@babylonjs/core/Maths/math.vector", () => {
  // Use traditional functions so they can be instantiated with 'new'
  function MockVector3(this: any, x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  function MockVector4(this: any, x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  return {
    Vector3: MockVector3,
    Vector4: MockVector4,
  };
});

vi.mock("@babylonjs/core/Meshes/mesh", () => ({
  Mesh: { DOUBLESIDE: 2 },
}));

vi.mock("@babylonjs/core/Materials/standardMaterial", () => {
  return {
    StandardMaterial: function (this: any) {
      this.diffuseTexture = null;
    },
  };
});

vi.mock("@babylonjs/core/Materials/Textures/texture", () => {
  return {
    Texture: function () {},
  };
});

describe("Dice Renderer Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => "blob:http://mock-url");
  });

  describe("generateD2MeshMaterial", () => {
    it("should generate SVG without slots if form.sides is undefined", () => {
      const mockMesh = {
        html: "<mesh-html />",
        width: 50,
        height: 50,
        sideSlots: [],
      };
      const mockForm = { foregroundColor: "black", backgroundColor: "white" };

      const result = generateD2MeshMaterial(mockMesh as any, mockForm as any);

      expect(result).toContain("<mesh-html />");
      expect(result).toContain('fg="black"');
      expect(result).not.toContain("<slot");
    });

    it("should process and include slots if form.sides are provided", () => {
      const mockMesh = {
        html: "<div>Mesh</div>",
        width: 50,
        height: 50,
        sideSlots: [{ x: 15, y: 25 }],
      };
      const mockForm = {
        foregroundColor: "black",
        backgroundColor: "white",
        sides: [{ elements: ["circle"] }],
      };

      const result = generateD2MeshMaterial(mockMesh as any, mockForm as any);

      expect(result).toContain('<slot x="15">');
      expect(result).toContain("<elements>circle</elements>");
    });
  });

  describe("dicePlaneRenderer3D", () => {
    const mockScene = {} as any;
    const mockDice = {
      piece: "d6",
      form: { foregroundColor: "blue", backgroundColor: "red", sides: [] },
    } as any;

    it("should construct the 3D plane mesh and attach materials correctly", async () => {
      const result = await dicePlaneRenderer3D(mockScene, mockDice);

      expect(result.mesh).toBeDefined();
      expect(result.imageUrl).toBe("blob:http://mock-url");
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it("should update camera position correctly when changeSide is triggered", async () => {
      const mockCamera = { setPosition: mockSetPosition } as any;
      const result = await dicePlaneRenderer3D(mockScene, mockDice);

      result.changeSide(mockCamera, 1);

      expect(mockSetPosition).toHaveBeenCalledWith(
        expect.objectContaining({ x: 0, y: 5, z: 10 }),
      );
    });

    it("should skip updating camera if the value position does not exist", async () => {
      const mockCamera = { setPosition: mockSetPosition } as any;
      const result = await dicePlaneRenderer3D(mockScene, mockDice);

      result.changeSide(mockCamera, 99);

      expect(mockSetPosition).not.toHaveBeenCalled();
    });
  });
});
