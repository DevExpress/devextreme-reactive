import { PureComputed } from '@devexpress/dx-core';
import {
  Scale, GetFormatFn, NumberArray,
} from './chart-core.types';

export type ProcessTickFn<T> = (coord: number, key: string, tick: any) => T;
export type TickFormatFn = (scale: Scale) => GetFormatFn;

export type AxisCoordinatesArg = {
  scaleName: string;
  scale: Scale;
  position: string;
  tickSize: number;
  tickFormat?: TickFormatFn;
  indentFromAxis: number;
};
export type Tick = {
  readonly key: string;
  readonly x1: number;
  readonly x2: number;
  readonly y1: number;
  readonly y2: number;
  readonly xText: number;
  readonly yText: number;
  readonly dominantBaseline: string;
  readonly textAnchor: string;
  readonly text: string;
};
export type AxisCoordinatesResult = {
  ticks: Tick[];
  sides: NumberArray;
};

export type AxisCoordinatesFn = PureComputed<[AxisCoordinatesArg], AxisCoordinatesResult>;

export type GridCoordinatesArg = {
  scaleName: string;
  scale: Scale;
};
export type Grid = {
  readonly key: string;
  readonly x: number;
  readonly y: number;
  readonly dx: number;
  readonly dy: number;
};

export type GetGridCoordinatesFn = PureComputed<[GridCoordinatesArg], Grid[]>;
