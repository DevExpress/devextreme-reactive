import { Size } from '@devexpress/dx-react-core';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  BBoxes, BBoxesChange, RangesCache, NumberArray,
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
export const getRanges = (paneSize: Size, rotated: boolean): RangesCache => {
  const horRange: NumberArray = [0, paneSize.width];
  const verRange: NumberArray = [paneSize.height, 0];
  return {
    [ARGUMENT_DOMAIN]: rotated ? verRange : horRange,
    [VALUE_DOMAIN]: rotated ? horRange : verRange,
  };
};
