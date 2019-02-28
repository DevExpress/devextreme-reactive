/** @internal */
export type BBox = {
  readonly width: number;
  readonly height: number;
};
/** @internal */
export type BBoxes = {
  readonly [placeholder: string]: BBox;
};
/** @internal */
export type BBoxesChange = {
  readonly bBox: BBox;
  readonly placeholder: string;
};
