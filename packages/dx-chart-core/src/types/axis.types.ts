import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { Scale, GetFormatFn } from './chart-core.types';

export type CallbackFn = PureComputed<[number, string, number], any> ;
export type AxisCoordinatesFn = PureComputed<[{
  scaleName: string, scale: Scale,
  position: string, tickSize: number, tickFormat: TickFormatFn, indentFromAxis: number,
}], {ticks: Tick[], sides: number[]}>;
export type TickFormatFn = CustomFunction<[Scale], GetFormatFn>;

export type GetGridCoordinatesFn = PureComputed<[{scaleName: string, scale: Scale}],
Tick[]>;

export type Tick = {
  key: string,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  xText: number,
  yText: number,
  text: Text,
};
export type HorizontalTickOptions = {
  y1: number,
  y2: number,
  yText: number,
  dominantBaseline: string,
  textAnchor: string,
};
export type VerticalTickOptions = {
  x1: number,
  x2: number,
  xText: number,
  dominantBaseline: string,
  textAnchor: string,
};
