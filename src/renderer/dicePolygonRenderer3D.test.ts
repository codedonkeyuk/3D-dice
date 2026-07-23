import dicePolygonRenderer3D, {
  generateD10MeshMaterial,
} from "./dicePolygonRenderer3D";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

jest.mock("./svg/generateSvg", () => jest.fn(() => "<svg>mock</svg>"));
jest.mock("./shape/castPiece", () => ({
  get3dTemplate: jest.fn(() => ({
    mesh: {
      material: {
        prism: { html: "<rect id='prism'/>", width: 1024, height: 1024 },
        side: { html: "<rect id='side'/>", width: 512, height: 512 },
      },
      sideSlots: [
        {
          sidePosition: { x: 1, y: 1, z: 1 },
          sideRotation: { x: 0, y: 0, z: 0 },
          sideIndex: 0,
          width: 1,
          height: 1,
        },
      ],
    },
    numberPositions: [{ x: 5, y: 5, z: 5 }],
  })),
}));
jest.mock("./image/stringToBlob", () => jest.fn(() => ({})));
jest.mock("./svg/diceMethods", () => ({
  diceStyle: jest.fn(() => ".style {}"),
}));
jest.mock("./canvas/canvasCommon", () => ({
  generateFaceUV: jest.fn(() => []),
}));
jest.mock("./svg/injectSideIntoSvg", () =>
  jest.fn(() => Promise.resolve("<svg>injected</svg>")),
);

describe("3D Dice Polygon Renderer Utilities", () => {
  let mockScene: any;
  let mockDice: any;
  let mockMeshInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();

    globalThis.URL.createObjectURL = jest.fn(() => "blob:mock-url");

    mockScene = {};

    mockMeshInstance = {
      enableEdgesRendering: jest.fn(),
      edgesWidth: 0,
      edgesColor: null,
      material: null,
    };

    MeshBuilder.CreatePolyhedron = jest.fn(() => mockMeshInstance);
    MeshBuilder.CreatePlane = jest.fn(() => ({
      setParent: jest.fn(),
      position: null,
      rotation: null,
      material: null,
    })) as any;

    mockDice = {
      piece: { modelId: "d10" },
      form: {
        foregroundColor: "#ffffff",
        backgroundColor: "#000000",
        sides: [{ type: "graphics" }],
      },
    };
  });

  describe("generateD10MeshMaterial", () => {
    it("should assemble the SVG payload correctly using template data configurations", () => {
      const mockTemplate: any = {
        mesh: {
          material: {
            prism: { html: "<polygon />", width: 500, height: 500 },
          },
        },
      };

      const result = generateD10MeshMaterial(mockTemplate, mockDice.form);
      expect(result).toBe("<svg>mock</svg>");
    });
  });

  describe("dicePolygonRenderer3D Base Pipeline", () => {
    it("should successfully build a custom polyhedron mesh structure and register edges", async () => {
      const result = await dicePolygonRenderer3D(mockScene, mockDice);

      expect(MeshBuilder.CreatePolyhedron).toHaveBeenCalledWith(
        "h",
        expect.objectContaining({ size: 0.5 }),
        mockScene,
      );
      expect(mockMeshInstance.enableEdgesRendering).toHaveBeenCalled();
      expect(mockMeshInstance.edgesWidth).toBe(0.5);
      expect(result.imageUrl).toBe("blob:mock-url");
    });

    it("should process all defined side slots and attach generated flat side planes to the master mesh parent", async () => {
      await dicePolygonRenderer3D(mockScene, mockDice);
      expect(MeshBuilder.CreatePlane).toHaveBeenCalledTimes(1);
    });

    it("should update the camera position correctly when invoking the returned changeSide callback handler", async () => {
      const mockCamera = {
        setPosition: jest.fn(),
      };

      const result = await dicePolygonRenderer3D(mockScene, mockDice);

      result.changeSide(mockCamera as any, 0);

      expect(mockCamera.setPosition).toHaveBeenCalledWith(
        expect.objectContaining({ x: 5, y: 5, z: 5 }),
      );
    });

    it("should throw an explicitly structured error if the passed dice structure is missing side array items", async () => {
      mockDice.form.sides = null;

      await expect(dicePolygonRenderer3D(mockScene, mockDice)).rejects.toThrow(
        "There are no sides for this dice",
      );
    });
  });
});
