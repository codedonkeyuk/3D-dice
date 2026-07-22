import { Tools } from "@babylonjs/core/Misc/tools";
import { type TemplateOpenGl } from "../../types";

const d6TemplateOpenGl: TemplateOpenGl = {
  numberPositions: [
    {
      x: 2.9999697902160416,
      y: -0.004401025951909951,
      z: 0.012723551457418431,
    },
    {
      x: 0.00045215339224093435,
      y: -2.999850001249996,
      z: 0.029996092374005415,
    },
    {
      x: -0.06187353892838277,
      y: 0.04575519188232806,
      z: 2.9990128588581095,
    },
    {
      x: -0.03652675089955789,
      y: -0.03984100786316036,
      z: -2.9995130422388847,
    },
    {
      x: 0.00029129891281160235,
      y: 2.999850001249996,
      z: -0.02999808569464711,
    },
    {
      x: -2.99857823728258,
      y: 0.008809716045631168,
      z: -0.09192901499793961,
    },
  ],
  mesh: {
    vertex: [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ],
    face: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [0, 4, 7, 3],
      [1, 5, 6, 2],
      [3, 2, 6, 7],
      [0, 1, 5, 4],
    ],
    sideSlots: [
      {
        sidePosition: {
          x: Tools.ToRadians(29),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(0),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(-90),
          z: Tools.ToRadians(0),
        },
        sideIndex: 0,
        width: 1,
        height: 1,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(29),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(180),
          z: Tools.ToRadians(0),
        },
        sideIndex: 2,
        width: 1,
        height: 1,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(-29),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(-90),
        },
        sideIndex: 3,
        width: 1,
        height: 1,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(29),
          z: Tools.ToRadians(0),
        },
        sideRotation: {
          x: Tools.ToRadians(90),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(0),
        },
        sideIndex: 4,
        width: 1,
        height: 1,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(-29),
          z: Tools.ToRadians(0),
        },
        sideRotation: {
          x: Tools.ToRadians(-90),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(180),
        },
        sideIndex: 1,
        width: 1,
        height: 1,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-29),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(0),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(90),
          z: Tools.ToRadians(0),
        },
        sideIndex: 5,
        width: 1,
        height: 1,
      },
    ],
    material: {
      prism: {
        html: `<rect class="side" x="0" y="0" width="1024" height="1024"></rect>`,
        width: 1024,
        height: 1024,
      },
      side: {
        html: `<rect class="side" x="0" y="0" width="512" height="512" />`,
        width: 512,
        height: 512,
      },
    },
  },
};

export default d6TemplateOpenGl;
