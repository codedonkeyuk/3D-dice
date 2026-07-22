import "@testing-library/jest-dom";
jest.mock("@babylonjs/core/Cameras/arcRotateCamera", () => ({}), {
  virtual: true,
});
jest.mock("@babylonjs/core/scene", () => ({}), { virtual: true });
jest.mock("@babylonjs/core/Meshes/mesh", () => ({}), { virtual: true });
jest.mock(
  "@babylonjs/core/Misc/tools",
  () => ({
    Tools: {
      ToRadians: (degrees: number) => (degrees * Math.PI) / 180,
    },
  }),
  { virtual: true },
);
