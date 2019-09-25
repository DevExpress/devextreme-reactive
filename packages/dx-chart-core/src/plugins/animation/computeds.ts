import {
  Scales, PathPoints,
} from '../../types';

/** @internal */
export const easeOutCubic = (t: number) => (t - 1) * (t - 1) * (t - 1) + 1;

/** @internal */
export const getDelay = (index: number, isStart: boolean) => isStart ? index * 30 : 0;

/** @internal */
export const getStartVal = (scales: Scales) => {
  return scales.valScale.copy().clamp!(true)(0);
};

/** @internal */
export const getStartCoordinates = (scales: Scales, coordinates: PathPoints) => {
  const startPosition = getStartVal(scales);
  return coordinates.map((coord) => {
    return { arg: coord.arg, val: startPosition, startVal: startPosition };
  });
};
