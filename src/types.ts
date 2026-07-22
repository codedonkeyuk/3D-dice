import { ArcRotateCamera, Scene } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export type GraphicElementTypes =
  | "square"
  | "triangle"
  | "pentagon"
  | "line"
  | "circle"
  | "hexagon"
  | "diceNumberedSide"
  | "text";
export type SystemElementTypes = "target";
export type RasterImageTypes = "image/png" | "image/webp";
export type VectorImageTypes = "image/svg+xml";
export type MimeType = RasterImageTypes | VectorImageTypes;
export type ImageTypes = "graphics" | "vector" | "raster";
export type ShapeElements = GraphicElementTypes | SystemElementTypes;
export type renderType = "plane" | "mesh" | "meshBase64";
export type PieceCategory = "board" | "dice" | "model" | "deck";
export type FormAttribute = string | number | undefined;
export type PieceForm =
  | "paper-model-setup"
  | "plastic-model-setup"
  | "plastic-model-upload"
  | "dice-setup"
  | "card-setup"
  | "card-image"
  | "card-image-import"
  | "base64-model-import"
  | "board-pattern";

type MaterialConfig = {
  html: string;
  width: number;
  height: number;
};

type VertexCoordinates = {
  x?: number;
  y?: number;
  z?: number;
  w?: number;
};

export type PrismMesh = {
  vertex: number[][];
  face: number[][];
  sideSlots: {
    sidePosition: Coordinates;
    sideRotation: Coordinates;
    sideIndex: number;
    width: number;
    height: number;
  }[];
  material: {
    prism: MaterialConfig;
    side: MaterialConfig;
  };
};

export type Form<S extends Side> = {
  type: PieceForm;
  thumbnail: string | null;
  foregroundColor?: FormAttribute;
  backgroundColor?: FormAttribute;
  width?: number;
  height?: number;
  records?: CardRecord;
  templates?: CardTemplate[];
  sides?: S[];
};

export type CardData = {
  id: number;
  template: number;
};

export type CardFieldType = "text" | "number";

export type CardField = {
  id: string;
  name: string;
  type: CardFieldType;
};

export type CardRecord = {
  fields: CardField[];
  data: CardData[];
};

export type CardTemplate = {
  parent: number;
  id: number;
  name: string;
  sides: Side[];
};

export type PlaneMesh = {
  frontUvs: VertexCoordinates;
  backUvs: VertexCoordinates;
  html: string;
  width: number;
  height: number;
  sideSlots: {
    x: number;
    y: number;
    rotate: number;
    width: number;
    height: number;
    skewX?: number;
    skewY?: number;
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
  }[];
};

export type Piece = {
  renderType: renderType;
};

export type BasicElement = {
  id: number | string;
  description: string;
  type: ShapeElements;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
};

export type Word = {
  bold: boolean;
  italic: boolean;
  content: string;
};

export type Coordinates = {
  x?: number;
  y?: number;
  z?: number;
};

export type MarkupText = {
  rows: number;
  cols: number;
  lineHeight: number;
  content: Word[][];
};

export type TemplateOpenGl = {
  numberPositions: Coordinates[];
  mesh: PrismMesh | PlaneMesh;
};

export type ModelPiece = Piece & {
  modelId: string;
  renderType: renderType;
  metalic: boolean;
  transparent: boolean;
  template?: {
    OpenGl?: TemplateOpenGl;
  };
};

export type GraphicElement = BasicElement & {
  type: GraphicElementTypes;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  fontSize?: number;
  fontColor?: string;
  content?: string;
  coOrds?: { x: number; y: number }[];
  markupText?: MarkupText;
};

export type SystemElement = BasicElement & {
  type: SystemElementTypes;
};

export type Side = {
  type: ImageTypes;
  systemElements: SystemElement[];
};

export type SideGraphics = Side & {
  type: "graphics";
  elements: GraphicElement[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
};

export type CategoryRecord<P extends Piece, S extends Side> = {
  id?: string;
  name: string;
  category: PieceCategory;
  subCategory?: string;
  description: string;
  form: Form<S>;
  readOnly: boolean;
  piece: P;
  setup?: Record<string, unknown> | undefined;
};

export type SceneResult = {
  mesh?: Mesh;
  imageUrl?: string;
  changeSide: (camera: ArcRotateCamera, value: number) => void;
};

export type SavedPieceRenderer3d = (
  scene: Scene,
  dice: CategoryRecord<ModelPiece, SideGraphics>,
) => Promise<SceneResult>;

export interface DrawMethods<DrawMethod> {
  square: DrawMethod;
  triangle: DrawMethod;
  pentagon: DrawMethod;
  line: DrawMethod;
  circle: DrawMethod;
  hexagon: DrawMethod;
  target: DrawMethod;
  diceNumberedSide: DrawMethod;
  text: DrawMethod;
}

export type SideImageFile = Side & {
  type: "vector" | "raster";
  mimeType: MimeType;
  image: string | ArrayBuffer | null;
};
