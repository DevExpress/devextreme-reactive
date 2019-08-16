import { PureComputed } from '@devexpress/dx-core';
import {
  ScaleObject, GetFormatFn, NumberArray,
} from './chart-core.types';
/** @internal */
export type ProcessTickFn<T> = (coord: number, key: string, tick: any) => T;
export type TickFormatFn = (scale: ScaleObject, count?: number) => GetFormatFn;
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
export type Grid = {
  readonly key: string;
  readonly x1: number;
  readonly y1: number;
};
/** @internal */
export type GetTickCoordinatesFn<T> = PureComputed<[{
  callback: TickCoordinatesGetterFn<T>,
  scaleName: string,
  scale: ScaleObject,
  paneSize: NumberArray,
  rotated: boolean,
  position?: string,
  tickSize?: number,
  tickFormat?: TickFormatFn,
  indentFromAxis?: number,
}], {
  ticks: T[],
  sides: NumberArray,
}>;

/** @internal */
export type TickCoordinatesGetterFn<T> = PureComputed<[{
  isHor: boolean,
  scale?: ScaleObject,
  tickCount?: number,
  tickFormat?: TickFormatFn,
  position?: string,
  tickSize?: number,
  indentFromAxis?: number,
}], ProcessTickFn<T>>;
