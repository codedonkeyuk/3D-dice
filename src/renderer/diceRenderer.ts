import type {
  CategoryRecord,
  ModelPiece,
  SideGraphics,
  SavedPieceRenderer3d,
} from "../types";
import dicePlaneRenderer3D from "./dicePlaneRenderer3D";
import dicePolygonRenderer3D from "./dicePolygonRenderer3D";

const getDice = async (
  diceModel: CategoryRecord<ModelPiece, SideGraphics>,
): Promise<SavedPieceRenderer3d> => {
  if (
    ["D4", "D6", "D8", "D10", "D12", "D20"].includes(
      diceModel.subCategory == null ? "" : diceModel.subCategory,
    )
  ) {
    return dicePolygonRenderer3D;
  }

  if (diceModel.subCategory === "D2") {
    return dicePlaneRenderer3D;
  }

  throw new Error(`Cannot find 3D renderer for dice ${diceModel.subCategory}`);
};

export default getDice;
