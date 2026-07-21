import {
  type SideGraphics,
  type ModelPiece,
  type CategoryRecord,
} from "../types";
import d2TemplateOpenGl from "./templates/d2TemplateOpenGl";
import { diceForm } from "./templates/diceForm";

const blankDiceD2: CategoryRecord<ModelPiece, SideGraphics> = {
  id: "blank-dice-d2",
  name: "Blank Dice D2",
  description:
    "Create a new dice. You can edit any of its sides after intial creation.",
  category: "dice",
  subCategory: "D2",
  readOnly: false,
  form: {
    ...diceForm,
    thumbnail:
      "data:image/svg+xml;utf8,%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20.content%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.background%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20black%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.side%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ff0000%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%0A%20%20%20%20%3Crect%20class%3D%22background%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221000%22%20height%3D%221000%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Crect%0A%20%20%20%20%20%20%20%20class%3D%22side%22%0A%20%20%20%20%20%20%20%20x%3D%22100%22%0A%20%20%20%20%20%20%20%20y%3D%22100%22%0A%20%20%20%20%20%20%20%20width%3D%22800%22%0A%20%20%20%20%20%20%20%20height%3D%22800%22%0A%20%20%20%20%2F%3E%0A%20%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22100%22%20y%3D%22100%22%20width%3D%22800%22%20height%3D%22800%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3C%2Fsvg%3E",
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
    ],
  },
  piece: {
    modelId: "blank-dice-d2",
    metalic: false,
    transparent: false,
    renderType: "plane",
    template: {
      OpenGl: d2TemplateOpenGl,
    },
  },
};

export default blankDiceD2;
