import type { TemplateOpenGl } from "../../types";

const d2TemplateOpenGl: TemplateOpenGl = {
  numberPositions: [
    {
      x: 0.2025222500441225,
      y: -0.14888420520362106,
      z: -2.9894511589383685,
    },
    {
      x: -0.07895688071547417,
      y: -0.1383962531336013,
      z: 2.9957657265057063,
    },
  ],
  mesh: {
    frontUvs: { x: 0, y: 0, z: 0.5, w: 1 },
    backUvs: { x: 0.5, y: 0, z: 1, w: 1 },
    html: `
    <rect
        class="side"
        x="0"
        y="0"
        width="1600"
        height="800"
    />
    `,
    width: 1600,
    height: 800,
    sideSlots: [
      {
        x: 0,
        y: 0,
        rotate: 0,
        width: 800,
        height: 800,
      },
      {
        x: 800,
        y: 0,
        rotate: 0,
        width: 800,
        height: 800,
        scaleX: -1,
        scaleY: 1,
        translateX: 800,
      },
    ],
  },
};

export default d2TemplateOpenGl;
