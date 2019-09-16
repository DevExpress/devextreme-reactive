import { PureComputed } from '@devexpress/dx-core';

/** @internal */
export type EasingFn = PureComputed<[number], number>;

/** @internal */
export type GetNewPositionsFn = PureComputed<[number], any>;

/** @internal */
export type ProcessAnimationFn = PureComputed<[any, any], GetNewPositionsFn>;

/** @internal */
export type SetAttributeFn = PureComputed<[any]>;

/** @internal */
export type RunAnimationFn = PureComputed<[
  SetAttributeFn, ProcessAnimationFn, EasingFn, number, number
], number>;
