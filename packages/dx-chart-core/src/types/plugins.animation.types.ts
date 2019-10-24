import { PureComputed } from '@devexpress/dx-core';
import { PathPoints } from './plugins.series.types';

/** @internal */
export type EasingFn = PureComputed<[number], number>;

/** @internal */
export type GetNewPositionsFn = PureComputed<[number], any>;

/** @internal */
export type ProcessAnimationFn = PureComputed<[any, any, number?], GetNewPositionsFn>;

/** @internal */
export type SetAttributeFn = (props: any) => void;

/** @internal */
export type RunAnimationFn = PureComputed<[
  SetAttributeFn, ProcessAnimationFn, EasingFn, number, number
], number>;

/** @internal */
export type UpdateAnimationFn = PureComputed<[any, any, number?, number?]>;

/** @internal */
export type Animation = {
  update: UpdateAnimationFn,
  stop: () => void;
};
/** @internal */
export type AnimationFn = PureComputed<
  [any, any, ProcessAnimationFn, SetAttributeFn, number?], Animation
>;
/** @internal */
export type RangePointCoordinates = {
  readonly arg: number, readonly val: number, readonly startVal: number,
};

/** @internal */
export type PathStartCoordinates = {
  readonly coordinates: RangePointCoordinates[],
};

/** @internal */
export type PathEndCoordinates = {
  readonly coordinates: PathPoints,
};

/** @internal */
export type PointCoordinates = { readonly arg: number, readonly val: number };

/** @internal */
export type PieCoordinates = {
  readonly innerRadius: number,
  readonly outerRadius: number,
  readonly startAngle: number,
  readonly endAngle: number,
};

/** @internal */
export type GetDelayFn = PureComputed<[number, boolean], number>;
