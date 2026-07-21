import {
  type SideGraphics,
  type ModelPiece,
  type CategoryRecord,
} from "../types";
import d4TemplateOpenGl from "./templates/d4TemplateOpenGl";
import { diceForm } from "./templates/diceForm";

const numberDiceD4: CategoryRecord<ModelPiece, SideGraphics> = {
  id: "number-dice-d4",
  name: "Numbered Dice D4",
  description: "Create a new numbered dice.",
  category: "dice",
  subCategory: "D4",
  readOnly: true,
  form: {
    ...diceForm,
    thumbnail:
      "data:image/svg+xml;utf8,%0A%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20.content%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.background%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20black%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.side%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ff0000%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%0A%20%20%20%20%3Crect%20class%3D%22background%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221000%22%20height%3D%221000%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C100%20900%2C900%20100%2C900%22%3E%3C%2Fpolygon%3E%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28117deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22271%22%20y%3D%22490%22%20width%3D%22190%22%20height%3D%22190%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3Csvg%20width%3D%22500%22%20height%3D%22500%22%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20%20%20id%3D%221%22%0A%20%20%20%20%20%20%20%20%20%20class%3D%22content%22%0A%20%20%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20%20%20y%3D%2260%25%22%0A%20%20%20%20%20%20%20%20%20%20dominant-baseline%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20font-size%3D%22500%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%201%0A%20%20%20%20%20%20%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22403%22%20y%3D%22710%22%20width%3D%22190%22%20height%3D%22190%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3Csvg%20width%3D%22500%22%20height%3D%22500%22%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20%20%20id%3D%224%22%0A%20%20%20%20%20%20%20%20%20%20class%3D%22content%22%0A%20%20%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20%20%20y%3D%2260%25%22%0A%20%20%20%20%20%20%20%20%20%20dominant-baseline%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20font-size%3D%22500%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%204%0A%20%20%20%20%20%20%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28243deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22537%22%20y%3D%22490%22%20width%3D%22190%22%20height%3D%22190%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3Csvg%20width%3D%22500%22%20height%3D%22500%22%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20%20%20id%3D%223%22%0A%20%20%20%20%20%20%20%20%20%20class%3D%22content%22%0A%20%20%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20%20%20y%3D%2260%25%22%0A%20%20%20%20%20%20%20%20%20%20dominant-baseline%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20%20%20font-size%3D%22500%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%203%0A%20%20%20%20%20%20%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3C%2Fsvg%3E",
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
    ],
  },
  piece: {
    modelId: "number-dice-d4",
    metalic: false,
    transparent: false,
    renderType: "mesh",
    template: {
      OpenGl: d4TemplateOpenGl,
    },
  },
};
export default numberDiceD4;
