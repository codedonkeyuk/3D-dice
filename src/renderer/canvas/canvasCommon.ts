import { Color3, Color4, Vector3, Vector4 } from "@babylonjs/core/Maths/math";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";

export function generateFaceUV(columns: number, w: number): Vector4[] {
  const faceUV = new Array(columns);
  for (let i = 0; i < columns; i += 1) {
    faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, w);
  }
  return faceUV;
}

export function createScene(
  canvas: HTMLCanvasElement,
  engine: Engine | WebGPUEngine,
): { scene: Scene; camera: ArcRotateCamera } {
  const scene = new Scene(engine);
  scene.clearColor = Color4.FromHexString("#000000");

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2,
    3,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl(canvas, true);
  camera.useAutoRotationBehavior = false;
  camera.useBouncingBehavior = false;
  camera.useFramingBehavior = false;
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 3;

  const light = new HemisphericLight("light", new Vector3(1, 1, -1), scene);
  light.intensity = 1;
  light.groundColor = new Color3(1, 1, 1);

  return {
    camera,
    scene,
  };
}
