import {
  type SideGraphics,
  type ModelPiece,
  type CategoryRecord,
} from "../types";
import d12TemplateOpenGl from "./templates/d12TemplateOpenGl";
import { diceForm } from "./templates/diceForm";

const blankDiceD12: CategoryRecord<ModelPiece, SideGraphics> = {
  id: "blank-dice-d12",
  name: "Blank Dice D12",
  description:
    "Create a new dice. You can edit any of its sides after intial creation.",
  category: "dice",
  subCategory: "D12",
  readOnly: false,
  form: {
    ...diceForm,
    thumbnail:
      "data:image/svg+xml;utf8,%0A%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20.content%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.background%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20black%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.side%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ff0000%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%0A%20%20%20%20%3Crect%20class%3D%22background%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221000%22%20height%3D%221000%22%20fill%3D%22black%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C320%2C%20690%2C458%20620%2C682%20381%2C682%20310%2C458%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22310%2C458%20500%2C320%20500%2C111%20272%2C186%20130%2C380%22%20style%3D%22opacity%3A%200.95%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C320%20500%2C111%20729%2C186%20870%2C380%20690%2C458%22%20style%3D%22opacity%3A%200.95%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22870%2C380%20690%2C458%20620%2C682%20730%2C814%20870%2C620%22%20style%3D%22opacity%3A%200.8%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22620%2C682%20730%2C814%20500%2C889%20271%2C814%20381%2C682%22%20style%3D%22opacity%3A%200.6%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22310%2C458%20130%2C380%20130%2C620%20271%2C814%20381%2C682%22%20style%3D%22opacity%3A%200.8%22%2F%3E%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22375%22%20y%3D%22415%22%20width%3D%22250%22%20height%3D%22250%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28324deg%29%20scale%281.25%2C%200.6%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22216%22%20y%3D%22170%22%20width%3D%22240%22%20height%3D%22240%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%2835deg%29%20scale%281.25%2C%200.6%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22543%22%20y%3D%22170%22%20width%3D%22240%22%20height%3D%22240%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28250deg%29%20scale%281.2%2C%200.55%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22120%22%20y%3D%22480%22%20width%3D%22240%22%20height%3D%22240%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28110deg%29%20scale%281.2%2C%200.55%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22635%22%20y%3D%22475%22%20width%3D%22240%22%20height%3D%22240%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28180deg%29%20scale%281.2%2C%200.55%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22380%22%20y%3D%22655%22%20width%3D%22240%22%20height%3D%22240%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3C%2Fsvg%3E",
    sides: [
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
      {
        type: "graphics",
        systemElements: [],
        elements: [],
      },
    ],
  },
  piece: {
    modelId: "blank-dice-d12",
    metalic: false,
    transparent: false,
    renderType: "mesh",
    template: {
      OpenGl: d12TemplateOpenGl,
    },
  },
};

export default blankDiceD12;
