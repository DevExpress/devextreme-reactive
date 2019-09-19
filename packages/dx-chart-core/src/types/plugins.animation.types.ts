import { PureComputed } from '@devexpress/dx-core';

/** @internal */
export type EasingFn = PureComputed<[number], number>;

/** @internal */
export type GetNewPositionsFn = PureComputed<[number], any>;

/** @internal */
export type ProcessAnimationFn = PureComputed<[any, any], GetNewPositionsFn>;

/** @internal */
export type SetAttributeFn = PureComputed<[any], void>;

/** @internal */
export type RunAnimationFn = PureComputed<[
  SetAttributeFn, ProcessAnimationFn, EasingFn, number, number
], number>;

/** @internal */
export type UpdateAnimationFn = PureComputed<[any, any, number?]>;

/** @internal */
export type UpdateAnimate = {
  update: UpdateAnimationFn,
};
/** @internal */
export type AnimationFn = PureComputed<
  [any, any, ProcessAnimationFn, SetAttributeFn, number?], UpdateAnimate
>;
/** @internal */
export type BarCoordinates = { readonly x: number, readonly y: number, readonly startY: number };

/** @internal */
export type PointCoordinates = { readonly x: number, readonly y: number };

/** @internal */
export type PathCoordinates = { readonly arg: number, readonly val: number };
/** @internal */
export type PieCoordinates = {
  readonly innerRadius: number,
  readonly outerRadius: number,
  readonly startAngle: number,
  readonly endAngle: number,
};
