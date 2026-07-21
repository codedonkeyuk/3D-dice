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

self.onmessage = (event: MessageEvent) => {
  const { type, canvas, width, height, deltaY } = event.data;

  if (type === "INIT") {
    initBabylon(canvas, width, height);
  } else if (type === "RESIZE" && engine) {
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
    engine.resize();
  } else if (type === "MOUSE_WHEEL" && camera) {
    camera.radius += deltaY * 0.01;

    camera.radius = Math.max(3, Math.min(25, camera.radius));
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
  scene.clearColor = new Color4(0, 0, 0, 0); // 🟢 Set Alpha to 0 (Fully transparent)

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
    if (box) {
      box.rotation.y += 0.01;
      box.rotation.x += 0.005;
    }
    scene?.render();
  });
}
