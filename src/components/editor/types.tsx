export type XyType = { x: number; y: number };

export type DragXyType = {
  cntrl: boolean;
  touchOne: XyType;
  touchTwo: XyType | undefined;
};
