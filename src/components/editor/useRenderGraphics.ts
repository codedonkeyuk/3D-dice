import canvasGraphicElementsRenderer from "./canvasGraphicElementsRenderer";
import { type GraphicElement } from "../../types";

export default function useRenderGraphics() {
  return (selected: GraphicElement[], ctx: CanvasRenderingContext2D | null) => {
    if (ctx != null) {
      // Loop through each individual graphic element and give it its own isolated path
      selected.forEach((element) => {
        ctx.beginPath(); // 🟢 Isolates this specific element from everything else
        canvasGraphicElementsRenderer([element], ctx);
        ctx.stroke(); // 🟢 Draws just this element
      });
    }
  };
}
