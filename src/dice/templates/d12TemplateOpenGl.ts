import { Tools } from "@babylonjs/core/Misc/tools";
import { type TemplateOpenGl } from "../../types";

const d12TemplateOpenGl: TemplateOpenGl = {
  numberPositions: [
    { x: 2.9500953231943736, y: -0.15586395834452949, z: 0.5221532443218739 },
    { x: 0.879358215711411, y: 1.6543977391964486, z: 2.3430102963927673 },
    { x: 1.5411526504158835, y: 2.528747581031142, z: -0.47987933852713976 },
    { x: 0.9608282308302589, y: -1.746236720956039, z: 2.2422012454782676 },
    { x: 1.6844900544526098, y: 0.03223032828808575, z: -2.482227721702561 },
    { x: 1.5459217016647921, y: -2.5538153009786995, z: -0.29690655231723573 },
    { x: -1.5438798801380993, y: 2.526815769683806, z: 0.48128679784719086 },
    { x: -1.853253605723074, y: 0.03069992779138518, z: 2.3589210642384857 },
    { x: -0.8345041833791649, y: 1.7841526765694011, z: -2.2628305271524236 },
    { x: -1.6300178776536043, y: -2.4566296125074176, z: 0.5549888877097411 },
    { x: -0.8757023230460715, y: -1.8399990112390547, z: -2.2017150315267906 },
    { x: -2.926134911948906, y: -0.07659176080095756, z: -0.6571667819139823 },
  ],
  mesh: {
    vertex: [
      [0, 0, 1.070466],
      [0.7136442, 0, 0.7978784],
      [-0.3568221, 0.618034, 0.7978784],
      [-0.3568221, -0.618034, 0.7978784],
      [0.7978784, 0.618034, 0.3568221],
      [0.7978784, -0.618034, 0.3568221],
      [-0.9341724, 0.381966, 0.3568221],
      [0.1362939, 1, 0.3568221],
      [0.1362939, -1, 0.3568221],
      [-0.9341724, -0.381966, 0.3568221],
      [0.9341724, 0.381966, -0.3568221],
      [0.9341724, -0.381966, -0.3568221],
      [-0.7978784, 0.618034, -0.3568221],
      [-0.1362939, 1, -0.3568221],
      [-0.1362939, -1, -0.3568221],
      [-0.7978784, -0.618034, -0.3568221],
      [0.3568221, 0.618034, -0.7978784],
      [0.3568221, -0.618034, -0.7978784],
      [-0.7136442, 0, -0.7978784],
      [0, 0, -1.070466],
    ],
    face: [
      [0, 1, 4, 7, 2],
      [0, 2, 6, 9, 3],
      [0, 3, 8, 5, 1],
      [1, 5, 11, 10, 4],
      [2, 7, 13, 12, 6],
      [3, 9, 15, 14, 8],
      [4, 10, 16, 13, 7],
      [5, 8, 14, 17, 11],
      [6, 12, 18, 15, 9],
      [10, 11, 17, 19, 16],
      [12, 13, 16, 19, 18],
      [14, 15, 18, 19, 17],
    ],
    sideSlots: [
      {
        sidePosition: {
          x: Tools.ToRadians(24),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(5),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(-101),
          z: Tools.ToRadians(-18),
        },
        sideIndex: 0,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(10),
          y: Tools.ToRadians(11),
          z: Tools.ToRadians(20),
        },
        sideRotation: {
          x: Tools.ToRadians(32),
          y: Tools.ToRadians(200),
          z: Tools.ToRadians(-75),
        },
        sideIndex: 1,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(14),
          y: Tools.ToRadians(20),
          z: Tools.ToRadians(-4),
        },
        sideRotation: {
          x: Tools.ToRadians(58),
          y: Tools.ToRadians(-68),
          z: Tools.ToRadians(37),
        },
        sideIndex: 2,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(12),
          y: Tools.ToRadians(-11),
          z: Tools.ToRadians(19),
        },
        sideRotation: {
          x: Tools.ToRadians(-32),
          y: Tools.ToRadians(-159),
          z: Tools.ToRadians(-109),
        },
        sideIndex: 3,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(17),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(-19),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(-37),
          z: Tools.ToRadians(91),
        },
        sideIndex: 4,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(14),
          y: Tools.ToRadians(-20),
          z: Tools.ToRadians(-5),
        },
        sideRotation: {
          x: Tools.ToRadians(-122),
          y: Tools.ToRadians(107),
          z: Tools.ToRadians(-33),
        },
        sideIndex: 5,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-14),
          y: Tools.ToRadians(20),
          z: Tools.ToRadians(4),
        },
        sideRotation: {
          x: Tools.ToRadians(122),
          y: Tools.ToRadians(-68),
          z: Tools.ToRadians(217),
        },
        sideIndex: 6,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-17),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(18),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(142),
          z: Tools.ToRadians(90),
        },
        sideIndex: 7,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-7),
          y: Tools.ToRadians(16),
          z: Tools.ToRadians(-18),
        },
        sideRotation: {
          x: Tools.ToRadians(30),
          y: Tools.ToRadians(19),
          z: Tools.ToRadians(-70),
        },
        sideIndex: 8,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-14),
          y: Tools.ToRadians(-20),
          z: Tools.ToRadians(4),
        },
        sideRotation: {
          x: Tools.ToRadians(-58),
          y: Tools.ToRadians(109),
          z: Tools.ToRadians(145),
        },
        sideIndex: 9,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-8),
          y: Tools.ToRadians(-12),
          z: Tools.ToRadians(-20),
        },
        sideRotation: {
          x: Tools.ToRadians(-31),
          y: Tools.ToRadians(20),
          z: Tools.ToRadians(-105),
        },
        sideIndex: 10,
        width: 0.3,
        height: 0.3,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-24),
          y: Tools.ToRadians(0),
          z: Tools.ToRadians(-5),
        },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(79),
          z: Tools.ToRadians(-92),
        },
        sideIndex: 11,
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

export default d12TemplateOpenGl;
