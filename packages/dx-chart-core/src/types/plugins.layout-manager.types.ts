export type BBox = {
  readonly width: number;
  readonly height: number;
};
export type BBoxes = {
  readonly [placeholder: string]: BBox;
};
export type BBoxesChange = {
  readonly bBox: BBox;
  readonly placeholder: string;
};
