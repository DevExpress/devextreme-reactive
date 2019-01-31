import { PureComputed } from '@devexpress/dx-core';

const isEqual = (
  { width: firstWidth, height: firstHeight },
  { width: secondWidth, height: secondHeight },
) => firstWidth === secondWidth && firstHeight === secondHeight;

type BBox = {
  width: number,
  height: number,
};

export const bBoxes: PureComputed<[BBox, {
  bBox: BBox,
  placeholder: string,
}]> = (prevBBoxes, { bBox, placeholder }) => {
  if (isEqual(prevBBoxes[placeholder] || {}, bBox)) return prevBBoxes;
  return { ...prevBBoxes, [placeholder]: bBox };
};
