import { PureComputed } from '@devexpress/dx-core';
import { PiePoint, Point } from './chart-core.types';

export type DBarFn = PureComputed<[{
  x: number, y: number, y1: number, width: number,
}],
  {x: number, y: number, width: number, height: number}
>;

export type DPieFn = PureComputed<[PiePoint], string>;
