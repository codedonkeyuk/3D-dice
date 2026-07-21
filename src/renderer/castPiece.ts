import { type ModelPiece, type TemplateOpenGl } from "../types";

export function get3dTemplate(piece: ModelPiece): TemplateOpenGl {
  const template = piece.template?.OpenGl;
  if (template == null) {
    throw Error("Missing openGl template");
  }
  return template;
}
