import { PureComputed } from '@devexpress/dx-core';
import { Scale, Point } from './chart-core.types';

export type Scales = {yScale: Scale, xScale: Scale};
export type GetAnimationStyleFn = PureComputed<[Scales, Point],
 {transformOrigin?: string, animation: string}>;
export type buildAnimatedStyleGetterFn = PureComputed<[any, GetAnimationStyleFn, Scales, Point]>;
