type BBox = {
  readonly width: number;
  readonly height: number;
};
type BBoxes = {
  readonly [placeholder: string]: BBox;
};
type BBoxesChange = {
  readonly bBox: BBox;
  readonly placeholder: string;
};

const isEqual = (
  { width: firstWidth, height: firstHeight }: BBox,
  { width: secondWidth, height: secondHeight }: BBox,
) => firstWidth === secondWidth && firstHeight === secondHeight;

export const bBoxes = (prevBBoxes: BBoxes, { bBox, placeholder }: BBoxesChange) => {
  if (isEqual(prevBBoxes[placeholder] || {}, bBox)) return prevBBoxes;
  return { ...prevBBoxes, [placeholder]: bBox };
};
