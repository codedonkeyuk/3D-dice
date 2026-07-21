import "@babylonjs/core/Materials/standardMaterial";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Color4 } from "@babylonjs/core/Maths/math.color";

let engine: Engine | null = null;
let scene: Scene | null = null;
let camera: ArcRotateCamera | null = null;
// 🟢 Keep track of the offscreen canvas globally so resize events can update it
let storedCanvas: OffscreenCanvas | null = null;

self.onmessage = (event: MessageEvent) => {
  const { type, canvas, width, height, deltaY, deltaX } = event.data;

  if (type === "INIT") {
    storedCanvas = canvas; // 🟢 Save canvas reference on initialization
    initBabylon(canvas, width, height);
  } else if (type === "RESIZE" && engine) {
    if (storedCanvas) {
      storedCanvas.width = width;
      storedCanvas.height = height;
    }
    // 1. Recalculate camera projection and viewport matrices
    engine.resize();

    // 2. 🟢 FIX: Force an immediate render call right here!
    // This draws the new frame instantly so the canvas never has a blank frame visible.
    scene?.render();
  } else if (type === "MOUSE_WHEEL" && camera) {
    camera.radius += deltaY * 0.01;
    camera.radius = Math.max(3, Math.min(25, camera.radius));
  } else if (type === "MOUSE_MOVE" && camera) {
    camera.alpha -= deltaX * 0.005;
    camera.beta -= deltaY * 0.005;
    camera.beta = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, camera.beta));
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
  const box = MeshBuilder.CreateBox("backgroundBox", { size: 2 }, scene);

  engine.runRenderLoop(() => {
    scene?.render();
  });
}
