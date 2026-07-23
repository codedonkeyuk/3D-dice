import { Tools } from "@babylonjs/core/Misc/tools";
import type { TemplateOpenGl } from "../../types";

const d4TemplateOpenGl: TemplateOpenGl = {
  numberPositions: [
    {
      x: 1.2293488451662873,
      y: 2.58112596453673,
      z: 0.9091150488704112,
    },
    {
      x: 0.5638275449914366,
      y: 2.8612210479593054,
      z: -0.7039265687723285,
    },
    {
      x: 0.7417623778940122,
      y: -2.897607067694091,
      z: -0.23165028812904828,
    },
    {
      x: -0.024527309969246416,
      y: -2.999850001249996,
      z: -0.017273710257859662,
    },
  ],
  mesh: {
    vertex: [
      [0, 0, 1.732051],
      [1.632993, 0, -0.5773503],
      [-0.8164966, 1.414214, -0.5773503],
      [-0.8164966, -1.414214, -0.5773503],
    ],
    face: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 3, 2],
    ],
    sideSlots: [
      {
        sidePosition: {
          x: Tools.ToRadians(17),
          y: Tools.ToRadians(6),
          z: Tools.ToRadians(14),
        },
        sideRotation: {
          x: Tools.ToRadians(54.75),
          y: Tools.ToRadians(-125),
          z: Tools.ToRadians(0),
        },
        sideIndex: 0,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(6),
          y: Tools.ToRadians(-13),
          z: Tools.ToRadians(-17),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(30),
        },
        sideIndex: 0,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-14),
          y: Tools.ToRadians(-13),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(110),
          z: Tools.ToRadians(-29),
        },
        sideIndex: 0,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(10),
          y: Tools.ToRadians(-18),
          z: Tools.ToRadians(-7),
        },
        sideRotation: {
          x: Tools.ToRadians(-125),
          y: Tools.ToRadians(55),
          z: Tools.ToRadians(120),
        },
        sideIndex: 1,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(9),
          y: Tools.ToRadians(19),
          z: Tools.ToRadians(-8),
        },
        sideRotation: {
          x: Tools.ToRadians(54.75),
          y: Tools.ToRadians(-125),
          z: Tools.ToRadians(-120),
        },
        sideIndex: 1,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-21),
          y: Tools.ToRadians(1),
          z: Tools.ToRadians(-7),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(110),
          z: Tools.ToRadians(90),
        },
        sideIndex: 1,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-4),
          y: Tools.ToRadians(18),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(54.75),
          y: Tools.ToRadians(-125),
          z: Tools.ToRadians(120),
        },
        sideIndex: 2,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-4),
          y: Tools.ToRadians(-18),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(-125),
          y: Tools.ToRadians(55),
          z: Tools.ToRadians(240),
        },
        sideIndex: 2,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-14),
          y: Tools.ToRadians(1),
          z: Tools.ToRadians(-17),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(-90),
        },
        sideIndex: 2,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-13),
          y: Tools.ToRadians(12),
          z: Tools.ToRadians(14),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(110),
          z: Tools.ToRadians(211),
        },
        sideIndex: 3,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(6),
          y: Tools.ToRadians(13),
          z: Tools.ToRadians(-17),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(150),
        },
        sideIndex: 3,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(17),
          y: Tools.ToRadians(-6),
          z: Tools.ToRadians(14),
        },
        sideRotation: {
          x: Tools.ToRadians(-130),
          y: Tools.ToRadians(55),
          z: Tools.ToRadians(0),
        },
        sideIndex: 3,
        width: 0.3,
        height: 0.3,
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

export default d4TemplateOpenGl;
