import {
  type SideGraphics,
  type ModelPiece,
  type CategoryRecord,
} from "../types";
import d20TemplateOpenGl from "./templates/d20TemplateOpenGl";
import { diceForm } from "./templates/diceForm";

const blankDiceD20: CategoryRecord<ModelPiece, SideGraphics> = {
  id: "blank-dice-d20",
  name: "Blank Dice D20",
  description:
    "Create a new dice. You can edit any of its sides after intial creation.",
  category: "dice",
  subCategory: "D20",
  readOnly: false,
  form: {
    ...diceForm,
    thumbnail:
      "data:image/svg+xml;utf8,%0A%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20.content%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.background%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20black%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.side%20%7B%0A%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ff0000%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%0A%20%20%20%20%3Crect%20class%3D%22background%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221000%22%20height%3D%221000%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C210%20265%2C640%20740%2C640%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C890%20265%2C640%20740%2C640%22%20style%3D%22opacity%3A%200.8%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C210%20265%2C640%20160%2C300%22%20style%3D%22opacity%3A%200.9%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22265%2C640%20160%2C300%20155%2C700%22%20style%3D%22opacity%3A%200.7%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22265%2C640%20155%2C700%20500%2C890%22%20style%3D%22opacity%3A%200.7%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C210%20160%2C300%20500%2C110%22%20style%3D%22opacity%3A%200.8%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C210%20500%2C110%20840%2C300%22%20style%3D%22opacity%3A%200.8%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C210%20840%2C300%20740%2C640%22%20style%3D%22opacity%3A%200.9%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22840%2C300%20740%2C640%20840%2C700%22%20style%3D%22opacity%3A%200.7%22%2F%3E%0A%20%20%20%20%3Cpolygon%20class%3D%22side%22%20points%3D%22500%2C890%20740%2C640%20840%2C700%22%20style%3D%22opacity%3A%200.6%22%2F%3E%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22391%22%20y%3D%22415%22%20width%3D%22220%22%20height%3D%22220%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20scale%280.4%2C%200.3%29%20skew%28-40deg%2C%20-20deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22255%22%20y%3D%2265%22%20width%3D%22280%22%20height%3D%22280%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%280deg%29%20scale%280.4%2C%200.3%29%20skew%2840deg%2C%2020deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22462%22%20y%3D%2265%22%20width%3D%22280%22%20height%3D%22280%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28299deg%29%20scale%280.65%2C%200.5%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22165%22%20y%3D%22240%22%20width%3D%22300%22%20height%3D%22300%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%0A%0A%0A%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28335deg%29%20scale%280.15%2C%200.7%29%20skew%28-50deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%2248%22%20y%3D%22405%22%20width%3D%22300%22%20height%3D%22300%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%2860deg%29%20scale%280.65%2C%200.5%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22535%22%20y%3D%22235%22%20width%3D%22300%22%20height%3D%22300%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%2830deg%29%20scale%280.15%2C%200.7%29%20skew%2860deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22652%22%20y%3D%22405%22%20width%3D%22300%22%20height%3D%22300%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28150deg%29%20scale%280.35%2C%200.6%29%20skew%2840deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22150%22%20y%3D%22605%22%20width%3D%22220%22%20height%3D%22220%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28180deg%29%20scale%281%2C%200.6%29%20skew%280deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22390%22%20y%3D%22600%22%20width%3D%22220%22%20height%3D%22220%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%0A%20%20%20%20%3Cg%20style%3D%22transform-box%3A%20fill-box%3Btransform-origin%3A%20center%3Btransform%3A%20rotate%28205deg%29%20scale%280.35%2C%200.5%29%20skew%28-40deg%2C%200deg%29%3B%22%3E%0A%20%20%20%20%3Csvg%20viewBox%3D%220%200%20500%20500%22%20x%3D%22627%22%20y%3D%22605%22%20width%3D%22220%22%20height%3D%22220%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22500%22%20height%3D%22500%22%20style%3D%22fill%3Atransparent%3Bstroke-width%3A10%3B%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3C%2Fsvg%3E",
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
    modelId: "blank-dice-d20",
    metalic: false,
    transparent: false,
    renderType: "mesh",
    template: {
      OpenGl: d20TemplateOpenGl,
    },
  },
};
export default blankDiceD20;
