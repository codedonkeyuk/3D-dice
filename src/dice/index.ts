import {
  type SideGraphics,
  type ModelPiece,
  type CategoryRecord,
} from "../types";
import blankDiceD10 from "./blank-dice-d10";
import blankDiceD12 from "./blank-dice-d12";
import blankDiceD2 from "./blank-dice-d2";
import blankDiceD20 from "./blank-dice-d20";
import blankDiceD4 from "./blank-dice-d4";
import blankDiceD6 from "./blank-dice-d6";
import blankDiceD8 from "./blank-dice-d8";
import numberDiceD10 from "./number-dice-d10";
import numberDiceD12 from "./number-dice-d12";
import numberDiceD2 from "./number-dice-d2";
import numberDiceD20 from "./number-dice-d20";
import numberDiceD4 from "./number-dice-d4";
import numberDiceD6 from "./number-dice-d6";
import numberDiceD8 from "./number-dice-d8";
import pokerDiceD6 from "./poker-dice-d6";

const dice: CategoryRecord<ModelPiece, SideGraphics>[] = [
  blankDiceD2,
  blankDiceD4,
  blankDiceD6,
  blankDiceD8,
  blankDiceD10,
  blankDiceD12,
  blankDiceD20,
  numberDiceD2,
  numberDiceD4,
  numberDiceD6,
  numberDiceD8,
  numberDiceD10,
  numberDiceD12,
  numberDiceD20,
  pokerDiceD6,
];

export default dice;
