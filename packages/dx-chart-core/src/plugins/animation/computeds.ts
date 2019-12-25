import {
  Scales, PointComponentProps, PieSeries, PathComponentProps, GetDelayFn,
} from '../../types';

/** @internal */
export const easeOutCubic = (t: number) => (t - 1) * (t - 1) * (t - 1) + 1;

/** @internal */
export const getDelay: GetDelayFn = (index, isStart) => isStart ? index * 30 : 0;

/** @internal */
export const getStartVal = (scales: Scales) => {
  return scales.valScale.copy().clamp!(true)(0);
};

/** @internal */
export const getPathStart = (scales: Scales, { coordinates }: PathComponentProps) => {
  const start = getStartVal(scales);
  return { coordinates: coordinates.map(coord =>
    ({ arg: coord.arg, val: start, startVal: start })) };
};

/** @internal */
export const getPointStart = (scales: Scales, { arg }: PointComponentProps) => {
  const start = getStartVal(scales);
  return { arg, val: start, startVal: start };
};

/** @internal */
export const getPieStart = (scales: Scales, { startAngle, endAngle }: PieSeries.PointProps) =>
({ innerRadius: 0, outerRadius: 0, startAngle, endAngle });
