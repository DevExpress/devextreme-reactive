import { PureComputed } from '@devexpress/dx-core';
import {
  ScaleObject, GetFormatFn, NumberArray,
} from './chart-core.types';
/** @internal */
export type ProcessTickFn<T> = (coord: number, key: string, tick: any) => T;
export type TickFormatFn = (scale: ScaleObject, count?: number) => GetFormatFn;
/** @internal */
export type AxisCoordinatesArg = {
  scaleName: string;
  scale: ScaleObject;
  position: string;
  tickSize: number;
  tickFormat?: TickFormatFn;
  indentFromAxis: number;
  paneSize: NumberArray;
};
/** @internal */
export type Tick = {
  readonly key: string;
  readonly x1: number;
  readonly x2: number;
  readonly y1: number;
  readonly y2: number;
  readonly xText: number;
  readonly yText: number;
  readonly dy: string;
  readonly textAnchor: string;
  readonly text: string;
};
/** @internal */
export type AxisCoordinatesResult = {
  ticks: Tick[];
  sides: NumberArray;
};
/** @internal */
export type AxisCoordinatesFn = PureComputed<[AxisCoordinatesArg], AxisCoordinatesResult>;
/** @internal */
export type GridCoordinatesArg = {
  scaleName: string;
  scale: ScaleObject;
  paneSize: NumberArray;
};
/** @internal */
export type Grid = {
  readonly key: string;
  readonly x: number;
  readonly y: number;
  readonly dx: number;
  readonly dy: number;
};
/** @internal */
export type GetGridCoordinatesFn = PureComputed<[GridCoordinatesArg], Grid[]>;
