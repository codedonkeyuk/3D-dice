import "@testing-library/jest-dom";
jest.mock("@babylonjs/core/Cameras/arcRotateCamera", () => ({}), {
  virtual: true,
});
const mockObserverCallbacks = new Set<() => void>();
const mockSceneDispose = jest.fn();

jest.mock("@babylonjs/core/scene", () => {
  return {
    Scene: class {
      clearColor = null;
      meshes = [];
      dispose = mockSceneDispose;
      onBeforeRenderObservable = {
        add: (cb: () => void) => {
          mockObserverCallbacks.add(cb);
          return cb;
        },
        remove: (cb: () => void) => {
          mockObserverCallbacks.delete(cb);
        },
      };
      render = jest.fn();
    },
  };
});
jest.mock("@babylonjs/core/Meshes/mesh", () => ({}), { virtual: true });
jest.mock(
  "@babylonjs/core/Engines/engine",
  () => ({
    Engine: class {
      runRenderLoop(cb: any) {}
      dispose() {}
      resize() {}
    },
  }),
  { virtual: true },
);
jest.mock(
  "@babylonjs/core/Lights/hemisphericLight",
  () => ({ HemisphericLight: class {} }),
  { virtual: true },
);
jest.mock(
  "@babylonjs/core/Misc/tools",
  () => ({
    Tools: {
      ToRadians: (degrees: number) => (degrees * Math.PI) / 180,
    },
  }),
  { virtual: true },
);
jest.mock("@babylonjs/core/Rendering/edgesRenderer", () => ({}), {
  virtual: true,
});
jest.mock(
  "@babylonjs/core/Meshes/meshBuilder",
  () => ({
    MeshBuilder: {
      CreatePolyhedron: jest.fn(() => ({ enableEdgesRendering: jest.fn() })),
      CreatePlane: jest.fn(),
    },
  }),
  { virtual: true },
);
jest.mock(
  "@babylonjs/core/Maths/math.vector",
  () => ({
    Vector3: class {
      x: any;
      y: any;
      z: any;
      constructor(x: any, y: any, z: any) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    },
  }),
  { virtual: true },
);
jest.mock(
  "@babylonjs/core/Materials/standardMaterial",
  () => ({ StandardMaterial: class {} }),
  { virtual: true },
);
jest.mock(
  "@babylonjs/core/Materials/Textures/texture",
  () => ({ Texture: class {} }),
  { virtual: true },
);
jest.mock("@babylonjs/core/Maths/math.color", () => ({ Color4: class {} }), {
  virtual: true,
});
