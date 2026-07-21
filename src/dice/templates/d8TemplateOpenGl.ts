import { Tools } from "@babylonjs/core/Misc/tools";
import { type TemplateOpenGl } from "../../types";

const d8TemplateOpenGl: TemplateOpenGl = {
  numberPositions: [
    { x: 1.9754143842506422, y: 0.8800302170126707, z: 2.079251025643678 },
    { x: 1.7205643606122774, y: -1.7490005632255188, z: -1.7264574454146515 },
    { x: 2.0243986338893527, y: 1.039068749032399, z: -1.95503102427843 },
    { x: 1.7393341112706453, y: -1.822174396455314, z: 1.629232125350181 },
    { x: -1.8117557528300516, y: 1.5883938886162066, z: -1.7873292776357403 },
    { x: -1.6460966950606721, y: -1.8442842507183932, z: 1.6997003480209174 },
    { x: -1.9967274434333504, y: 1.2638323869719974, z: 1.8481902538106785 },
    { x: -1.7263238033945112, y: -1.704714231029424, z: -1.764583666579533 },
  ],
  mesh: {
    vertex: [
      [0, 0, 1.414214],
      [1.414214, 0, 0],
      [0, 1.414214, 0],
      [-1.414214, 0, 0],
      [0, -1.414214, 0],
      [0, 0, -1.414214],
    ],
    face: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [1, 4, 5],
      [1, 5, 2],
      [2, 5, 3],
      [3, 5, 4],
    ],
    sideSlots: [
      {
        sidePosition: {
          x: Tools.ToRadians(13),
          y: Tools.ToRadians(15),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(35),
          y: Tools.ToRadians(-136),
          z: Tools.ToRadians(0),
        },
        sideIndex: 0,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(13),
          y: Tools.ToRadians(-15),
          z: Tools.ToRadians(-13),
        },
        sideRotation: {
          x: Tools.ToRadians(-35),
          y: Tools.ToRadians(-45),
          z: Tools.ToRadians(180),
        },
        sideIndex: 1,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(13),
          y: Tools.ToRadians(15),
          z: Tools.ToRadians(-13),
        },
        sideRotation: {
          x: Tools.ToRadians(35),
          y: Tools.ToRadians(-45),
          z: Tools.ToRadians(0),
        },
        sideIndex: 2,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(13),
          y: Tools.ToRadians(-15),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(-35),
          y: Tools.ToRadians(-136),
          z: Tools.ToRadians(180),
        },
        sideIndex: 3,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-13),
          y: Tools.ToRadians(15),
          z: Tools.ToRadians(-13),
        },
        sideRotation: {
          x: Tools.ToRadians(35),
          y: Tools.ToRadians(45),
          z: Tools.ToRadians(0),
        },
        sideIndex: 4,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-13),
          y: Tools.ToRadians(-15),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(-35),
          y: Tools.ToRadians(136),
          z: Tools.ToRadians(180),
        },
        sideIndex: 5,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-13),
          y: Tools.ToRadians(15),
          z: Tools.ToRadians(13),
        },
        sideRotation: {
          x: Tools.ToRadians(35),
          y: Tools.ToRadians(-225),
          z: Tools.ToRadians(0),
        },
        sideIndex: 6,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: {
          x: Tools.ToRadians(-13),
          y: Tools.ToRadians(-15),
          z: Tools.ToRadians(-13),
        },
        sideRotation: {
          x: Tools.ToRadians(-35),
          y: Tools.ToRadians(45),
          z: Tools.ToRadians(180),
        },
        sideIndex: 7,
        width: 0.35,
        height: 0.35,
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

export default d8TemplateOpenGl;
