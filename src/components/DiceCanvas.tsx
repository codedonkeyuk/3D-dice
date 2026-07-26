import React, { useEffect, useRef, useState } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";
import "@babylonjs/core/Materials/standardMaterial";

import { useDiceEngine } from "../context/DiceContextProvider";
import getDice from "../renderer/diceRenderer";

import styled from "styled-components";

const BabylonCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
  aspect-ratio: unset;
`;

const RollDiceButton = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: none;
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    padding: 15px 15px;
    font-size: 1.75rem;
    font-weight: 600;
    width: 90%;
    bottom: 5vh;
  }
`;

const DiceToastDiv = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--card);
  color: var(--text-main);
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: var(--box-shadow);
  pointer-events: none;
  animation: slideInDown 0.2s ease-out;
`;

const DiceCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);

  const [rollResult, setRollResult] = useState<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const [isRolling, setIsRolling] = useState<boolean>(false);

  const { model } = useDiceEngine();

  const rollDice = () => {
    if (isRolling) return;

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!scene || !camera) return;

    setIsRolling(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setRollResult(null);

    const randomSpinAlpha =
      (Math.random() * 0.3 + 0.2) * (Math.random() > 0.5 ? 1 : -1);

    let betaVelocity =
      (Math.random() * 0.15 + 0.1) * (Math.random() > 0.5 ? 1 : -1);

    let speedModifier = 1.0;

    const animationObserver = scene.onBeforeRenderObservable.add(() => {
      camera.alpha += randomSpinAlpha * speedModifier;
      camera.beta += betaVelocity * speedModifier;

      if (camera.beta <= 0.15) {
        camera.beta = 0.15;
        betaVelocity = -betaVelocity;
      } else if (camera.beta >= Math.PI - 0.15) {
        camera.beta = Math.PI - 0.15;
        betaVelocity = -betaVelocity;
      }

      speedModifier -= 0.005;

      if (speedModifier <= 0) {
        scene.onBeforeRenderObservable.remove(animationObserver);

        const sidePositions = model?.piece?.template?.OpenGl?.numberPositions;

        if (sidePositions) {
          const camDirection = camera.position.clone().normalize();

          let bestMatchIndex = -1;
          let highestDotProduct = -Infinity;

          sidePositions.forEach((side: any, index: number) => {
            const sideVector = new Vector3(side.x, side.y, side.z).normalize();

            const dotProduct = Vector3.Dot(camDirection, sideVector);

            if (dotProduct > highestDotProduct) {
              highestDotProduct = dotProduct;
              bestMatchIndex = index;
            }
          });

          const rolledValue = bestMatchIndex + 1;

          setRollResult(rolledValue);

          const baseRadius = 5;
          camera.radius = 6.2;

          const joltObserver = scene.onBeforeRenderObservable.add(() => {
            camera.radius += (baseRadius - camera.radius) * 0.15;

            if (Math.abs(camera.radius - baseRadius) < 0.01) {
              camera.radius = baseRadius;
              scene.onBeforeRenderObservable.remove(joltObserver);
              setIsRolling(false);
            }
          });

          toastTimeoutRef.current = window.setTimeout(() => {
            setRollResult(null);
          }, 4000);
        } else {
          setIsRolling(false);
        }
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
    engine.canvasTabIndex = 0;
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

    light.specular = new Color3(0, 0, 0);

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

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      scene.dispose();
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !model) return;

    let isMounted = true;

    const currentMeshes = scene.meshes.slice();
    currentMeshes.forEach((mesh) => {
      if (mesh.name !== "mainCam_target") {
        mesh.dispose();
      }
    });

    const renderAsyncModel = async () => {
      const renderer = await getDice(model);

      if (!isMounted) return;

      await renderer(scene, model);
    };

    renderAsyncModel().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, [model]);

  return (
    <>
      {rollResult !== null && (
        <DiceToastDiv>You rolled a {rollResult}!</DiceToastDiv>
      )}

      <BabylonCanvas ref={canvasRef} data-testid="babylon-canvas" />

      <RollDiceButton onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </RollDiceButton>
    </>
  );
};

export default DiceCanvas;
