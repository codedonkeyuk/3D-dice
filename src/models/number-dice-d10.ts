import {
  type SideGraphics,
  type ModelPiece,
  type CategoryRecord,
} from "../types";
import d10TemplateOpenGl from "./templates/d10TemplateOpenGl";
import { diceForm } from "./templates/diceForm";

const numberDiceD10: CategoryRecord<ModelPiece, SideGraphics> = {
  id: "number-dice-d10",
  name: "Numbered Dice D10",
  description: "Create a new numbered dice.",
  category: "dice",
  subCategory: "D10",
  readOnly: true,
  form: {
    ...diceForm,
    thumbnail:
      "data:image/svg+xml;utf8,%0A%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20.content%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.background%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20black%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.side%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ff0000%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%0A%20%20%20%20%3Crect%20class%3D%22background%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221000%22%20height%3D%221000%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22520%2C170%20760%2C530%20520%2C600%20270%2C530%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22520%2C170%20270%2C530%20170%2C550%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22520%2C170%20760%2C530%20860%2C550%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22520%2C600%20520%2C850%20170%2C550%20270%2C530%22%20style%3D%22opacity%3A%200.7%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22520%2C600%20520%2C850%20860%2C550%20760%2C530%22%20style%3D%22opacity%3A%200.6%22%2F%3E%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22415%22%20y%3D%22330%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3Csvg%20width%3D%22500%22%20height%3D%22500%22%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20%20%20id%3D%2210%22%0A%20%20%20%20%20%20%20%20%20%20class%3D%22content%22%0A%20%20%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20%20%20y%3D%2260%25%22%0A%20%20%20%20%20%20%20%20%20%20dominant-baseline%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20font-size%3D%22500%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%200%0A%20%20%20%20%20%20%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28170deg%29%20scale%280.7%2C%200.59%29%20skew%28-50deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22560%22%20y%3D%22570%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3Csvg%20width%3D%22500%22%20height%3D%22500%22%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20%20%20id%3D%227%22%0A%20%20%20%20%20%20%20%20%20%20class%3D%22content%22%0A%20%20%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20%20%20y%3D%2260%25%22%0A%20%20%20%20%20%20%20%20%20%20dominant-baseline%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20font-size%3D%22500%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%207%0A%20%20%20%20%20%20%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28190deg%29%20scale%280.7%2C%200.59%29%20skew%2850deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22278%22%20y%3D%22570%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3Csvg%20width%3D%22500%22%20height%3D%22500%22%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20%20%20id%3D%223%22%0A%20%20%20%20%20%20%20%20%20%20class%3D%22content%22%0A%20%20%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20%20%20y%3D%2260%25%22%0A%20%20%20%20%20%20%20%20%20%20dominant-baseline%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20font-size%3D%22500%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%203%0A%20%20%20%20%20%20%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3C%2Fsvg%3E",
    sides: [
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 1",
            content: "1",
            fontSize: 500,
            id: "numbered-dice-side-1",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 2",
            content: "2",
            fontSize: 500,
            id: "numbered-dice-side-2",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 3",
            content: "3",
            fontSize: 500,
            id: "numbered-dice-side-3",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 4",
            content: "4",
            fontSize: 500,
            id: "numbered-dice-side-4",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 5",
            content: "5",
            fontSize: 500,
            id: "numbered-dice-side-5",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 6",
            content: "6",
            fontSize: 500,
            id: "numbered-dice-side-6",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 7",
            content: "7",
            fontSize: 500,
            id: "numbered-dice-side-7",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 8",
            content: "8",
            fontSize: 500,
            id: "numbered-dice-side-8",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 9",
            content: "9",
            fontSize: 500,
            id: "numbered-dice-side-9",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [
          {
            description: "side 10",
            content: "0",
            fontSize: 500,
            id: "numbered-dice-side-0",
            rotate: 0,
            type: "diceNumberedSide",
            width: 500,
            height: 500,
            x: 0,
            y: 0,
          },
        ],
      },
    ],
  },
  piece: {
    modelId: "number-dice-d10",
    metalic: false,
    transparent: false,
    renderType: "mesh",
    template: {
      OpenGl: d10TemplateOpenGl,
    },
  },
};

export default numberDiceD10;
