import { PureComputed } from '@devexpress/dx-core';
import { ScaleObject } from './chart-core.types';
import { PointComponentProps } from './plugins.series.types';

export type Scales = {
  readonly xScale: ScaleObject;
  readonly yScale: ScaleObject;
};
export type GetAnimationStyleFn = (scales: Scales, point?: PointComponentProps) => {
  readonly animation: string;
  readonly transformOrigin?: string;
};
export type BuildAnimatedStyleGetterFn = PureComputed<
  [any, GetAnimationStyleFn, Scales, PointComponentProps?]
>;
