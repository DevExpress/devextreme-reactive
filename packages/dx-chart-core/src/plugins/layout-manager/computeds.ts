import { Size } from '@devexpress/dx-react-core';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  BBoxes, BBoxesChange, RangesCache,
} from '../../types';

const isEqual = (
  { width: firstWidth, height: firstHeight }: Size,
  { width: secondWidth, height: secondHeight }: Size,
) => firstWidth === secondWidth && firstHeight === secondHeight;

/** @internal */
export const bBoxes = (prevBBoxes: BBoxes, { bBox, placeholder }: BBoxesChange) => {
  if (isEqual(prevBBoxes[placeholder] || {}, bBox)) return prevBBoxes;
  return { ...prevBBoxes, [placeholder]: bBox };
};

/** @internal */
export const getRanges = (paneSize: Size): RangesCache => ({
  [ARGUMENT_DOMAIN]: [0, paneSize.width],
  [VALUE_DOMAIN]: [paneSize.height, 0],
});
