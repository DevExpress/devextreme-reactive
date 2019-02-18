import { PureComputed } from '@devexpress/dx-core';
import {
  ScaleObject, Point,
} from './chart-core.types';
export type Scales = {
  readonly xScale: ScaleObject;
  readonly yScale: ScaleObject;
};
export type GetAnimationStyleFn = (scales: Scales, point?: Point) => {
  readonly animation: string;
  readonly transformOrigin?: string;
};
export type BuildAnimatedStyleGetterFn = PureComputed<
  [any, GetAnimationStyleFn, Scales, Point?]
>;
