jest.mock(
  "@babylonjs/core/Meshes/mesh",
  () => ({
    Mesh: {
      DOUBLESIDE: 2,
    },
  }),
  { virtual: true },
);
jest.mock(
  "@babylonjs/core/Maths/math.vector",
  () => ({
    Vector3: class {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    },
    Vector4: class {
      x: number;
      y: number;
      z: number;
      w: number;
      constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }
    },
  }),
  { virtual: true },
);

import dicePlaneRenderer3D, {
  generateD2MeshMaterial,
} from "./dicePlaneRenderer3D";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

jest.mock("./svg/generateSvg", () =>
  jest.fn(() => "<svg>mock-plane-svg</svg>"),
);
jest.mock("./svg/svgGraphicElementsRenderer", () =>
  jest.fn(() => "<g>mock-graphic</g>"),
);
jest.mock("./image/stringToBlob", () => jest.fn(() => ({})));
jest.mock("./svg/diceMethods", () => ({
  diceStyle: jest.fn(() => ".style {}"),
  diceSlot: jest.fn(() => "<g class='slot'></g>"),
}));
jest.mock("./shape/castPiece", () => ({
  get3dTemplate: jest.fn(() => ({
    mesh: {
      html: "<rect id='plane-base'/>",
      width: 512,
      height: 512,
      frontUvs: { x: 0, y: 0, z: 0.5, w: 1 },
      backUvs: { x: 0.5, y: 0, z: 1, w: 1 },
      sideSlots: [
        {
          x: 10,
          y: 20,
          rotate: 0,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
        },
      ],
    },
    numberPositions: [{ x: 0, y: 0, z: 5 }],
  })),
}));

describe("3D Dice Plane Renderer Utilities", () => {
  let mockScene: any;
  let mockDice: any;
  let mockPlaneInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();

    globalThis.URL.createObjectURL = jest.fn(() => "blob:mock-plane-url");

    mockScene = {};

    mockPlaneInstance = {
      material: null,
    };

    MeshBuilder.CreatePlane = jest.fn(() => mockPlaneInstance) as any;

    mockDice = {
      piece: { modelId: "d2-coin" },
      form: {
        foregroundColor: "#ffffff",
        backgroundColor: "#000000",
        sides: [{ elements: [{ type: "path", d: "M0 0h10v10H0z" }] }],
      },
    };
  });

  describe("generateD2MeshMaterial", () => {
    it("should assemble the flat SVG layout loops with sideSlots mapped accurately", () => {
      const mockMeshCfg: any = {
        html: "<circle />",
        width: 256,
        height: 256,
        sideSlots: [{ x: 5, y: 5, rotate: 90, width: 50, height: 50 }],
      };

      const result = generateD2MeshMaterial(mockMeshCfg, mockDice.form);
      expect(result).toBe("<svg>mock-plane-svg</svg>");
    });
  });

  describe("dicePlaneRenderer3D Base Pipeline", () => {
    it("should successfully build a flat double-sided plane mesh structure via MeshBuilder", async () => {
      const result = await dicePlaneRenderer3D(mockScene, mockDice);

      expect(MeshBuilder.CreatePlane).toHaveBeenCalledWith(
        "plane",
        expect.objectContaining({
          sideOrientation: Mesh.DOUBLESIDE,
        }),
        mockScene,
      );
      expect(mockPlaneInstance.material).toBeDefined();
      expect(result.imageUrl).toBe("blob:mock-plane-url");
      expect(result.mesh).toBe(mockPlaneInstance);
    });

    it("should pass Vector4 configurations to the plane options mapping sequence", async () => {
      await dicePlaneRenderer3D(mockScene, mockDice);

      expect(MeshBuilder.CreatePlane).toHaveBeenCalledWith(
        "plane",
        expect.objectContaining({
          frontUVs: expect.objectContaining({ x: 0, y: 0, z: 0.5, w: 1 }),
          backUVs: expect.objectContaining({ x: 0.5, y: 0, z: 1, w: 1 }),
        }),
        mockScene,
      );
    });

    it("should alter camera coordinates exactly when invoking the returned changeSide handler callback", async () => {
      const mockCamera = {
        setPosition: jest.fn(),
      };

      const result = await dicePlaneRenderer3D(mockScene, mockDice);

      result.changeSide(mockCamera as any, 0);

      expect(mockCamera.setPosition).toHaveBeenCalledWith(
        expect.objectContaining({ x: 0, y: 0, z: 5 }),
      );
    });
  });
});
