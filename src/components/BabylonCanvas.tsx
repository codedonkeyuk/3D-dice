import React, { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";
import "@babylonjs/core/Materials/standardMaterial";

import { useDiceEngine } from "../context/DiceContextProvider";

const BabylonCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);

  const { renderModel, error } = useDiceEngine();

  const rollDice = () => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!scene || !camera) return;

    // Generate random velocities for orbital speed (alpha) and vertical tilt (beta)
    const randomSpinAlpha =
      (Math.random() * 0.3 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
    const randomSpinBeta =
      (Math.random() * 0.15 + 0.1) * (Math.random() > 0.5 ? 1 : -1);

    let speedModifier = 1.0;

    // Attach to the core render cycle frame observer
    const animationObserver = scene.onBeforeRenderObservable.add(() => {
      // Modify camera target angles directly
      camera.alpha += randomSpinAlpha * speedModifier;
      camera.beta += randomSpinBeta * speedModifier;

      // Restrict camera from flipping upside down during the wild spin
      camera.beta = Math.max(0.1, Math.min(Math.PI - 0.1, camera.beta));

      // 🌟 CHANGED: Smaller subtraction makes the roll last much longer
      speedModifier -= 0.005;

      if (speedModifier <= 0) {
        scene.onBeforeRenderObservable.remove(animationObserver);
      }
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasElement = canvasRef.current;

    const engine = new Engine(canvasElement, true, {
      disableWebGL2Support: false,
      preserveDrawingBuffer: false,
    });
    engineRef.current = engine;

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera(
      "mainCam",
      0,
      Math.PI / 3,
      5,
      Vector3.Zero(),
      scene,
    );
    cameraRef.current = camera;

    const light = new HemisphericLight(
      "mainLight",
      new Vector3(0, 1, 0),
      scene,
    );
    light.diffuse = new Color3(1, 1, 1);
    light.groundColor = new Color3(1, 1, 1);

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => engine.resize();

    const handleWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      cameraRef.current.radius += e.deltaY * 0.01;
      cameraRef.current.radius = Math.max(
        3,
        Math.min(25, cameraRef.current.radius),
      );
    };

    let isPointerDown = false;
    const handlePointerDown = () => {
      isPointerDown = true;
    };
    const handlePointerUp = () => {
      isPointerDown = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown || !cameraRef.current) return;
      cameraRef.current.alpha -= e.movementX * 0.005;
      cameraRef.current.beta -= e.movementY * 0.005;
      cameraRef.current.beta = Math.max(
        0.05,
        Math.min(Math.PI - 0.05, cameraRef.current.beta),
      );
    };

    window.addEventListener("resize", handleResize);
    canvasElement.addEventListener("wheel", handleWheel, { passive: true });
    canvasElement.addEventListener("pointerdown", handlePointerDown);
    canvasElement.addEventListener("pointerup", handlePointerUp);
    canvasElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvasElement.removeEventListener("wheel", handleWheel);
      canvasElement.removeEventListener("pointerdown", handlePointerDown);
      canvasElement.removeEventListener("pointerup", handlePointerUp);
      canvasElement.removeEventListener("pointermove", handlePointerMove);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !renderModel) return;

    const currentMeshes = scene.meshes.slice();
    currentMeshes.forEach((mesh) => {
      if (mesh.name !== "mainCam_target") {
        mesh.dispose();
      }
    });

    renderModel(scene).catch(console.error);
  }, [renderModel]);

  if (error)
    return <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>;

  return (
    <>
      <canvas className="my-babylon-canvas" ref={canvasRef} />
      <button onClick={rollDice} className="roll-dice">
        Roll Dice
      </button>
    </>
  );
};

export default BabylonCanvas;
