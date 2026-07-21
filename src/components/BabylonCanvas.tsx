import React, { useEffect, useRef } from "react";

const BabylonCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const activePointersRef = useRef<PointerEvent[]>([]);
  const previousPinchDistanceRef = useRef<number | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!workerRef.current) return;
    workerRef.current.postMessage({
      type: "MOUSE_WHEEL",
      deltaY: e.deltaY,
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    activePointersRef.current.push(e.nativeEvent);

    if (activePointersRef.current.length === 1) {
      isDraggingRef.current = true;
      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    } else if (activePointersRef.current.length === 2) {
      isDraggingRef.current = false;
      previousPinchDistanceRef.current = getDistance(
        activePointersRef.current[0],
        activePointersRef.current[1],
      );
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const getDistance = (p1: PointerEvent, p2: PointerEvent) => {
    const dx = p1.clientX - p2.clientX;
    const dy = p1.clientY - p2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const worker = new Worker(
      new URL("../worker/babylon.worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    const htmlCanvas = canvasRef.current;
    const offscreenCanvas = htmlCanvas.transferControlToOffscreen();

    worker.postMessage(
      {
        type: "INIT",
        canvas: offscreenCanvas,
        width: htmlCanvas.clientWidth,
        height: htmlCanvas.clientHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      [offscreenCanvas],
    );

    const handleResize = () => {
      workerRef.current?.postMessage({
        type: "RESIZE",
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!workerRef.current) return;

      const index = activePointersRef.current.findIndex(
        (p) => p.pointerId === e.pointerId,
      );
      if (index !== -1) activePointersRef.current[index] = e;

      if (
        activePointersRef.current.length === 2 &&
        previousPinchDistanceRef.current !== null
      ) {
        const currentDistance = getDistance(
          activePointersRef.current[0],
          activePointersRef.current[1],
        );
        const distanceDelta =
          currentDistance - previousPinchDistanceRef.current;

        workerRef.current.postMessage({
          type: "MOUSE_WHEEL",
          deltaY: distanceDelta * -5,
        });

        previousPinchDistanceRef.current = currentDistance;
      } else if (
        isDraggingRef.current &&
        activePointersRef.current.length === 1
      ) {
        const deltaX = e.clientX - previousPointerPositionRef.current.x;
        const deltaY = e.clientY - previousPointerPositionRef.current.y;

        previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };

        workerRef.current.postMessage({
          type: "MOUSE_MOVE",
          deltaX,
          deltaY,
        });
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      activePointersRef.current = activePointersRef.current.filter(
        (p) => p.pointerId !== e.pointerId,
      );

      if (activePointersRef.current.length < 2) {
        previousPinchDistanceRef.current = null;
      }
      if (activePointersRef.current.length === 0) {
        isDraggingRef.current = false;
      } else if (activePointersRef.current.length === 1) {
        isDraggingRef.current = true;
        previousPointerPositionRef.current = {
          x: activePointersRef.current[0].clientX,
          y: activePointersRef.current[0].clientY,
        };
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      worker.terminate();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      className="my-babylon-canvas"
    />
  );
};

export default BabylonCanvas;
