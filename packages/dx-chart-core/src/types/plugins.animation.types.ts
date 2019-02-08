import { PureComputed } from '@devexpress/dx-core';
import {
  Scale, Point,
} from './chart-core.types';
export type Scales = {
  readonly xScale: Scale;
  readonly yScale: Scale;
};
export type GetAnimationStyleFn = (scales: Scales, point?: Point) => {
  readonly animation: string;
  readonly transformOrigin?: string;
};
export type BuildAnimatedStyleGetterFn = PureComputed<
  [any, GetAnimationStyleFn, Scales, {index: number}?]
>;
