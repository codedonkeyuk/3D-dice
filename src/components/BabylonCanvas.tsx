import React, { useEffect, useRef } from "react";

const BabylonCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!workerRef.current) return;

    e.preventDefault();

    workerRef.current.postMessage({
      type: "MOUSE_WHEEL",
      deltaY: e.deltaY,
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const worker = new Worker(
      new URL("../worker/babylon.worker.ts", import.meta.url),
      {
        type: "module",
      },
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
      worker.postMessage({
        type: "RESIZE",
        width: htmlCanvas.clientWidth,
        height: htmlCanvas.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      worker.terminate();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default BabylonCanvas;
