import { PureComputed } from '@devexpress/dx-core';
import { Point, Scale } from './chart-core.types';

// The *Scales* name is occupied by now.
export type ScalesCache = {
  readonly [key: string]: Scale,
};
export type GetItemFn = PureComputed<[Point], any>;
export type Layout = {width: number, height: number};
