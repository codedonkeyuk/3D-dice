import dice from "./index";
import {
  type CategoryRecord,
  type ModelPiece,
  type SideGraphics,
} from "../types.ts";

const findRecord = (
  id: string,
  data: CategoryRecord<ModelPiece, SideGraphics>[],
) => data.find((rec) => rec.id === id);

export const findDice = (id: string) => findRecord(id, dice);
