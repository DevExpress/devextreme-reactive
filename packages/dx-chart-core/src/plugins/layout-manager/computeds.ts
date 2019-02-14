import {
  BBox, BBoxes, BBoxesChange,
} from '../../types';

const isEqual = (
  { width: firstWidth, height: firstHeight }: BBox,
  { width: secondWidth, height: secondHeight }: BBox,
) => firstWidth === secondWidth && firstHeight === secondHeight;

/** @internal */
export const bBoxes = (prevBBoxes: BBoxes, { bBox, placeholder }: BBoxesChange) => {
  if (isEqual(prevBBoxes[placeholder] || {}, bBox)) return prevBBoxes;
  return { ...prevBBoxes, [placeholder]: bBox };
};
