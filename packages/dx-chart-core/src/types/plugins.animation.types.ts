import { PureComputed } from '@devexpress/dx-core';
import {
  ScaleObject,
} from './chart-core.types';
export type Scales = {
  readonly xScale: ScaleObject;
  readonly yScale: ScaleObject;
};
type SomePoint = {index: number};
export type GetAnimationStyleFn = (scales: Scales, point?: SomePoint) => {
  readonly animation: string;
  readonly transformOrigin?: string;
};
export type BuildAnimatedStyleGetterFn = PureComputed<
  [any, GetAnimationStyleFn, Scales, SomePoint?]
>;
