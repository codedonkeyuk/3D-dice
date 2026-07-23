import { Tools } from "@babylonjs/core/Misc/tools";
import type { TemplateOpenGl } from "../../types";

const d10TemplateOpenGl: TemplateOpenGl = {
  numberPositions: [
    {
      x: 0.4252521353518122,
      y: -0.9701068784461586,
      z: -2.8067870004277444,
    },
    {
      x: -2.207833974453986,
      y: -1.5981732215053868,
      z: 1.2535196429692719,
    },
    {
      x: 1.052206595641891,
      y: 2.5547358084483167,
      z: 1.1688396935078946,
    },

    {
      x: 2.1460247956824987,
      y: -1.3596283931294806,
      z: -1.5956153073068824,
    },
    {
      x: -2.2024086736104054,
      y: 1.708967851756305,
      z: 1.108523755302111,
    },
    {
      x: -0.7386687565611023,
      y: -2.609115829297263,
      z: -1.2833094160766265,
    },
    {
      x: 2.769201291293866,
      y: 0.3875709666679916,
      z: -1.0868822172123456,
    },
    {
      x: -0.1458219085198392,
      y: -0.48632958305239016,
      z: 2.95672445581994,
    },
    {
      x: -2.5538063585290613,
      y: 0.22625800038317595,
      z: -1.557844793424282,
    },
    {
      x: 2.7036200096388563,
      y: 0.2705709881129461,
      z: 1.2717036541081306,
    },
  ],
  mesh: {
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
    vertex: [
      [0.5257311, 0.381966, 0.8506508],
      [-0.2008114, 0.618034, 0.8506508],
      [-0.6498394, 0, 0.8506508],
      [0.5257311, -1.618034, 0.8506508],
      [1.051462, 0, -0.2008114],
      [0.8506508, 0.618034, 0.2008114],
      [-0.5257311, 1.618034, -0.8506508],
      [-1.051462, 0, 0.2008114],
      [-0.8506508, -0.618034, -0.2008114],
      [0.2008114, -0.618034, -0.8506508],
      [0.6498394, 0, -0.8506508],
      [-0.5257311, -0.381966, -0.8506508],
    ],
    face: [
      [3, 0, 1, 2],
      [0, 3, 4, 5],
      [1, 0, 5, 6],
      [2, 1, 6, 7],
      [3, 2, 7, 8],
      [4, 3, 9, 10],
      [5, 4, 10, 6],
      [7, 6, 11, 8],
      [3, 8, 11, 9],
      [10, 9, 11, 6],
    ],
    sideSlots: [
      {
        sidePosition: { x: 0, y: 0, z: -0.43 },
        sideRotation: { x: 0, y: 0, z: Tools.ToRadians(18) },
        sideIndex: 0,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: 0, y: 0, z: 0.43 },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(180),
          z: Tools.ToRadians(160),
        },
        sideIndex: 7,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: -0.37, y: 0, z: -0.23 },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(64),
          z: Tools.ToRadians(-12),
        },
        sideIndex: 8,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: 0.4, y: 0, z: 0.2 },
        sideRotation: {
          x: Tools.ToRadians(0),
          y: Tools.ToRadians(-115),
          z: Tools.ToRadians(13),
        },
        sideIndex: 9,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: -0.28, y: -0.24, z: 0.23 },
        sideRotation: {
          x: Tools.ToRadians(-30),
          y: Tools.ToRadians(120),
          z: Tools.ToRadians(-205),
        },
        sideIndex: 1,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: -0.065, y: -0.38, z: -0.2 },
        sideRotation: {
          x: Tools.ToRadians(-60),
          y: Tools.ToRadians(30),
          z: Tools.ToRadians(178),
        },
        sideIndex: 5,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: 0.32, y: -0.22, z: -0.2 },
        sideRotation: {
          x: Tools.ToRadians(-30),
          y: Tools.ToRadians(-60),
          z: Tools.ToRadians(210),
        },
        sideIndex: 3,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: 0.32, y: 0.23, z: -0.18 },
        sideRotation: {
          x: Tools.ToRadians(30),
          y: Tools.ToRadians(-60),
          z: Tools.ToRadians(30),
        },
        sideIndex: 6,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: 0.1, y: 0.38, z: 0.2 },
        sideRotation: {
          x: Tools.ToRadians(120),
          y: Tools.ToRadians(30),
          z: Tools.ToRadians(180),
        },
        sideIndex: 2,
        width: 0.35,
        height: 0.35,
      },
      {
        sidePosition: { x: -0.295, y: 0.25, z: 0.19 },
        sideRotation: {
          x: Tools.ToRadians(150),
          y: Tools.ToRadians(-60),
          z: Tools.ToRadians(152),
        },
        sideIndex: 4,
        width: 0.35,
        height: 0.35,
      },
    ],
  },
};

export default d10TemplateOpenGl;
