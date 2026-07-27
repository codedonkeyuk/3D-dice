import "@babylonjs/core/Rendering/edgesRenderer";

import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Scene } from "@babylonjs/core/scene";

import type {
  ModelPiece,
  SideGraphics,
  Form,
  TemplateOpenGl,
  PlaneMesh,
  SceneResult,
  CategoryRecord,
} from "../types";

import generateSvg from "./svg/generateSvg";
import svgGraphicElementsRenderer from "./svg/svgGraphicElementsRenderer";
import { get3dTemplate } from "./shape/castPiece";

import stringToBlob from "./image/stringToBlob";
import { diceSlot, diceStyle } from "./svg/diceMethods";

export function generateD2MeshMaterial(
  mesh: PlaneMesh,
  form: Form<SideGraphics>,
): string {
  let slots: string = "";

  if (!form.sides) {
    const content = `
      ${diceStyle(form.foregroundColor, form.backgroundColor)}
      ${mesh.html}
    `;
    return generateSvg(content, mesh.width, mesh.height);
  }

  for (let i = 0; i < mesh.sideSlots.length; i++) {
    const { x, y, rotate, width, height, scaleX, scaleY, translateX } =
      mesh.sideSlots[i];

    const side = form.sides[i];

    if (side) {
      slots += `
        ${diceSlot({
          x,
          y,
          content: svgGraphicElementsRenderer((side as SideGraphics).elements),
          rotate,
          width,
          height,
          scaleX,
          scaleY,
          translateX,
        })}
      `;
    }
  }

  const content = `
    ${diceStyle(form.foregroundColor, form.backgroundColor)}
    ${mesh.html}
    ${slots}
  `;
  return generateSvg(content, mesh.width, mesh.height);
}

function changeSide(
  template: TemplateOpenGl,
  camera: ArcRotateCamera,
  value: number,
) {
  if (value != null) {
    const newPosition = template.numberPositions[value];
    if (newPosition != null) {
      camera.setPosition(
        new Vector3(newPosition.x, newPosition.y, newPosition.z),
      );
    }
  }
}

async function dicePlaneRenderer3D(
  scene: Scene,
  dice: CategoryRecord<ModelPiece, SideGraphics>,
): Promise<SceneResult> {
  const template = get3dTemplate(dice.piece);
  const meshCfg = template.mesh as PlaneMesh;
  const { frontUvs, backUvs } = meshCfg;

  const mesh = MeshBuilder.CreatePlane(
    "plane",
    {
      frontUVs: new Vector4(frontUvs.x, frontUvs.y, frontUvs.z, frontUvs.w),
      backUVs: new Vector4(backUvs.x, backUvs.y, backUvs.z, backUvs.w),
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene,
  );

  const myMaterial = new StandardMaterial("myMaterial", scene);

  mesh.material = myMaterial;
  const svgString = generateD2MeshMaterial(meshCfg, dice.form);

  const svgBlob = stringToBlob(svgString);
  const imageUrl = URL.createObjectURL(svgBlob);

  myMaterial.diffuseTexture = new Texture(imageUrl, scene);

  return {
    mesh,
    imageUrl,
    changeSide: (camera: ArcRotateCamera, value: number) =>
      changeSide(template, camera, value),
  };
}

export default dicePlaneRenderer3D;
