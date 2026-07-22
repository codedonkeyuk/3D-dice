import { Vector4 } from "@babylonjs/core/Maths/math";

export function generateFaceUV(columns: number, w: number): Vector4[] {
  const faceUV = new Array(columns);
  for (let i = 0; i < columns; i += 1) {
    faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, w);
  }
  return faceUV;
}
