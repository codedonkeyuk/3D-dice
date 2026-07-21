import "@babylonjs/core/Materials/standardMaterial";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";

let engine: Engine | null = null;
let scene: Scene | null = null;
let camera: ArcRotateCamera | null = null;

let storedCanvas: OffscreenCanvas | null = null;

self.onmessage = (event: MessageEvent) => {
  const { type, canvas, width, height, deltaY, deltaX } = event.data;

  if (type === "INIT") {
    storedCanvas = canvas;
    initBabylon(canvas, width, height);
  } else if (type === "RESIZE" && engine) {
    if (storedCanvas) {
      storedCanvas.width = width;
      storedCanvas.height = height;
    }
    engine.resize();

    scene?.render();
  } else if (type === "MOUSE_WHEEL" && camera) {
    camera.radius += deltaY * 0.01;
    camera.radius = Math.max(3, Math.min(25, camera.radius));
  } else if (type === "MOUSE_MOVE" && camera) {
    camera.alpha -= deltaX * 0.005;
    camera.beta -= deltaY * 0.005;

    // FIXED: Expanded the limits to allow viewing the bottom of the cube
    // 0.05 prevents flipping upside down over the north pole
    // Math.PI - 0.05 prevents flipping upside down over the south pole
    camera.beta = Math.max(0.05, Math.min(Math.PI - 0.05, camera.beta));
  }
};

function initBabylon(
  offscreenCanvas: OffscreenCanvas,
  width: number,
  height: number,
) {
  offscreenCanvas.width = width;
  offscreenCanvas.height = height;

  engine = new Engine(offscreenCanvas, true, {
    disableWebGL2Support: false,
    preserveDrawingBuffer: false,
  });

  scene = new Scene(engine);
  scene.clearColor = new Color4(0, 0, 0, 0);

  camera = new ArcRotateCamera(
    "workerCam",
    0,
    Math.PI / 3,
    10,
    Vector3.Zero(),
    scene,
  );

  const light = new HemisphericLight(
    "workerLight",
    new Vector3(0, 1, 0),
    scene,
  );

  light.diffuse = new Color3(1, 1, 1);
  light.groundColor = new Color3(0.4, 0.4, 0.4);

  const box = MeshBuilder.CreateBox("backgroundBox", { size: 2 }, scene);

  engine.runRenderLoop(() => {
    scene?.render();
  });
}
