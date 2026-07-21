import React, { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";
import "@babylonjs/core/Materials/standardMaterial";

import getDice from "../renderer/diceRenderer";
import { findDice } from "../dice/find";

interface BabylonCanvasProps {
  foregroundColor: string;
  backgroundColor: string;
  diceType: string;
}

const BabylonCanvas: React.FC<BabylonCanvasProps> = ({
  foregroundColor,
  backgroundColor,
  diceType,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let engine: Engine | null = null;
    let scene: Scene | null = null;
    let camera: ArcRotateCamera | null = null;

    const initBabylon = async (canvasElement: HTMLCanvasElement) => {
      engine = new Engine(canvasElement, true, {
        disableWebGL2Support: false,
        preserveDrawingBuffer: false,
      });

      scene = new Scene(engine);
      scene.clearColor = new Color4(0, 0, 0, 0);

      camera = new ArcRotateCamera(
        "mainCam",
        0,
        Math.PI / 3,
        5,
        Vector3.Zero(),
        scene,
      );

      const light = new HemisphericLight(
        "mainLight",
        new Vector3(0, 1, 0),
        scene,
      );

      light.diffuse = new Color3(1, 1, 1);
      light.groundColor = new Color3(0.4, 0.4, 0.4);

      const dice = findDice(diceType);
      if (dice === undefined) {
        throw new Error(
          `The dice "${diceType}" is not in collection this should never happen`,
        );
      }

      const renderer = await getDice(dice);

      // TableTop Build pulled this model from the database, form was how we kept settings
      // I don't want this defating to musch from original source code
      await renderer(scene, {
        ...dice,
        form: {
          ...dice.form,
          foregroundColor,
          backgroundColor,
        },
      });

      engine.runRenderLoop(() => {
        scene?.render();
      });
    };

    initBabylon(canvasRef.current).catch(console.error);

    const handleResize = () => {
      engine?.resize();
    };

    const handleWheel = (e: WheelEvent) => {
      if (!camera) return;
      camera.radius += e.deltaY * 0.01;
      camera.radius = Math.max(3, Math.min(25, camera.radius));
    };

    let isPointerDown = false;
    const handlePointerDown = () => {
      isPointerDown = true;
    };
    const handlePointerUp = () => {
      isPointerDown = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown || !camera) return;
      camera.alpha -= e.movementX * 0.005;
      camera.beta -= e.movementY * 0.005;
      camera.beta = Math.max(0.05, Math.min(Math.PI - 0.05, camera.beta));
    };

    const canvas = canvasRef.current;
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("wheel", handleWheel, { passive: true });
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      scene?.dispose();
      engine?.dispose();
    };
  }, [foregroundColor, backgroundColor, diceType]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        touchAction: "none",
      }}
    />
  );
};

export default BabylonCanvas;
