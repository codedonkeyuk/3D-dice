import canvasGraphicElementsRenderer from "./canvasGraphicElementsRenderer";
import { type GraphicElement } from "../../types";

export default function useRenderGraphics() {
  return (selected: GraphicElement[], ctx: CanvasRenderingContext2D | null) => {
    if (ctx != null) {
      selected.forEach((element) => {
        ctx.beginPath();
        canvasGraphicElementsRenderer([element], ctx);
        ctx.stroke();
      });
    }
  };
}
