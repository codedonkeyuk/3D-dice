import "@babylonjs/core/Rendering/edgesRenderer";

import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Scene } from "@babylonjs/core/scene";
import { Color4 } from "@babylonjs/core/Maths/math.color";

import {
  type ModelPiece,
  type Form,
  type TemplateOpenGl,
  type SceneResult,
  type Side,
  type PrismMesh,
  type CategoryRecord,
  type SideGraphics,
} from "../types";

import generateSvg from "./svg/generateSvg";
import { get3dTemplate } from "./shape/castPiece";
import stringToBlob from "./image/stringToBlob";
import { diceStyle } from "./svg/diceMethods";

import { generateFaceUV } from "./canvas/canvasCommon";
import injectSideIntoSvg from "./svg/injectSideIntoSvg";

export function generateD10MeshMaterial(
  template3dD2: TemplateOpenGl,
  form: Form<Side>,
) {
  const meshCng = template3dD2.mesh as PrismMesh;
  const { prism: prismCfg } = meshCng.material;
  const content = `
    ${diceStyle(form.foregroundColor, form.backgroundColor)}
    ${prismCfg.html}
  `;
  return generateSvg(content, prismCfg.width, prismCfg.height);
}

async function generateSidePlane(
  template3dD2: TemplateOpenGl,
  scene: Scene,
  parent: Mesh,
  backgroundColor: string,
  color: string,
  side: Side,
  sidePosition: Vector3,
  sideRotation: Vector3,
  width: number,
  height: number,
): Promise<Mesh> {
  const meshCng = template3dD2.mesh as PrismMesh;
  const { side: sideCfg } = meshCng.material;
  const side1Blob = stringToBlob(
    generateSvg(
      `
  ${diceStyle(color, backgroundColor)}
  ${sideCfg.html}
  ${await injectSideIntoSvg("square", side, sideCfg.width, sideCfg.height)}`,
      sideCfg.width,
      sideCfg.height,
    ),
  );
  const side1Url = URL.createObjectURL(side1Blob);

  const mat = new StandardMaterial("side1", scene);
  mat.diffuseTexture = new Texture(side1Url, scene);

  const plane = MeshBuilder.CreatePlane("plane", {
    width,
    height,
  });
  plane.material = mat;
  plane.setParent(parent);
  plane.position = sidePosition;
  plane.rotation = sideRotation;
  return plane;
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

async function dicePolygonRenderer3D(
  scene: Scene,
  dice: CategoryRecord<ModelPiece, SideGraphics>,
): Promise<SceneResult> {
  const template = get3dTemplate(dice.piece);
  const { form } = dice;

  if (form.sides == null) {
    throw new Error("There are no sides for this dice");
  }

  const mesh = MeshBuilder.CreatePolyhedron(
    "h",
    {
      custom: template.mesh,
      faceUV: generateFaceUV(10, 0.7),
      size: 0.5,
    },
    scene,
  );

  mesh.enableEdgesRendering();
  mesh.edgesWidth = 0.5;
  mesh.edgesColor = new Color4(0, 0, 0, 1);
  const myMaterial = new StandardMaterial("myMaterial", scene);
  myMaterial.backFaceCulling = false;
  mesh.material = myMaterial;
  const svgString = generateD10MeshMaterial(template, form);

  const svgBlob = stringToBlob(svgString);
  const imageUrl = URL.createObjectURL(svgBlob);

  myMaterial.diffuseTexture = new Texture(imageUrl, scene);

  const sidePromises: any[] = [];

  const templateMesh = template.mesh as PrismMesh;
  templateMesh.sideSlots.forEach((sideSlot) => {
    const { sidePosition, sideRotation, sideIndex, width, height } = sideSlot;
    sidePromises.push(
      generateSidePlane(
        template,
        scene,
        mesh,
        form.backgroundColor as string,
        form.foregroundColor as string,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        form.sides[sideIndex],
        new Vector3(sidePosition.x, sidePosition.y, sidePosition.z),
        new Vector3(sideRotation.x, sideRotation.y, sideRotation.z),
        width,
        height,
      ),
    );
  });

  const sides = await Promise.all(sidePromises);

  return {
    mesh,
    imageUrl,
    changeSide: (camera: ArcRotateCamera, value: number) =>
      changeSide(template, camera, value),
  };
}

export default dicePolygonRenderer3D;
