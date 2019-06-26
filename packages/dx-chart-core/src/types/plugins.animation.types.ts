import { PureComputed } from '@devexpress/dx-core';
import { ScaleObject } from './chart-core.types';
import { PointComponentProps } from './plugins.series.types';

/** @internal */
export type Scales = {
  readonly xScale: ScaleObject;
  readonly yScale: ScaleObject;
};
/** @internal */
export type GetAnimationStyleFn = (rotated: boolean, scales: Scales, point?: PointComponentProps)
=> {
  readonly animation: string;
  readonly transformOrigin?: string;
};
/** @internal */
export type BuildAnimatedStyleGetterFn = (rotated: boolean) => GetSeriesAnimatedStyleFn;

/** @internal */
export type GetSeriesAnimatedStyleFn = PureComputed<
[any, GetAnimationStyleFn, Scales, PointComponentProps?]
>;
