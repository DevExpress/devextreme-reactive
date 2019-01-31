import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { ContinuousSeriesHitTesterCreatorFn } from './utils.types';

export interface Scale {
  (value: any): number ;
  // A function that returns an array of ticks.
  ticks?: TicksFn;
  // A function that sets (if the domain parameter is an array) or
  // gets (if the domain parameter is undefined) the current domain.
  domain: DomainFn;
  // A function that returns a tick formatter function.
  tickFormat?: ScaleTickFormatFn;
  // A function that returns each band’s width.
  bandwidth?: BandwidthFn;
  // A function that sets (if the range parameter is an array) or
  // gets (if the range parameter is undefined) the scale’s current range.
  range: RangeFn;
  // Returns an exact copy of this scale
  copy: CopyFn;
  // Enables or disables clamping
  clamp: ClampFn;
  // A function that sets a scale’s inner padding and returns the current scale
  paddingInner?: PaddingInnerFn;
  // A function that sets a scale’s outer padding and returns the current scale
  paddingOuter?: PaddingOuterFn;
}

export interface BarPoint {
  // The bar's x coordinate (the bar's center)
  x: number;
  // The bar's y coordinate'
  y: number;
// The bar's y1 coordinate
  y1: number;
// The bar's width in relative units
  barWidth: number;
// The maximum width that the bar can occupy, measured in pixels
  maxBarWidth: number;
// The bar's value
  value: number;
  // A series color
  color: string;
// Point index
  index: number;
}

export interface PiePoint {
  // The slice's x coordinate
  x: number;
  // The slice's y coordinate
  y: number;
// The slice's maximum radius in pixels
  maxRadius: number;
// The inner radius in relative units
  innerRadius: number;
// The outer radius in relative units
  outerRadius: number;
// The slice's start angle
  startAngle: number;
// The slice's end angle
  endAngle: number;
// The slice's value
  value: number;
// A series color
  color: string;
// Point index
  index: number;
}

export interface ScatterPoint {
  // The point's x coordinate
  x: number;
  // The point's y coordinate
  y: number;
// Point options
  point: { size: number };
// The point's value
  value: number;
// A series color
  color: string;
// Point index
  index: number;
}

export interface Target {
  // Series name
  series: string;
  // The point’s index within the data array
  point: number;
}

export interface Stack {
  // A list of series names
  series: string[];
}

type Text = string;
export type GetFormatFn = PureComputed<[any], Text>;

export type RangeFn = CustomFunction<[any[]?], any[]>;
export type BandwidthFn = CustomFunction<[], number>;
export type ScaleTickFormatFn = CustomFunction<[number?, string?], GetFormatFn>;
export type DomainFn = CustomFunction<[any[]?], any>;
export type TicksFn = CustomFunction<[number?], any[]>;
export type PaddingInnerFn = CustomFunction<[number], Scale>;
export type PaddingOuterFn = CustomFunction<[number], Scale>;
export type CopyFn = CustomFunction<[], Scale>;
export type ClampFn = CustomFunction<[boolean], Scale>;

export type Point = {
  index: number,
  argument: any,
  color: string,
  value: number,
  value0: number,
  x: number,
  y: number,
  y1: number,
  size: number,
};

export type Series = {
  index: number,
  scaleName: string,
  symbolName: string,
  name: string,
  getValueDomain?: GetValueDomainFn,
  points: Point[],
  color: string,
  argumentField: string,
  valueField: string,
  createHitTester: ContinuousSeriesHitTesterCreatorFn,
  getPointTransformer: GetPointTransformerFn,
};

export type PointFn = PureComputed<[Point]>;
export type GetValueDomainFn = PureComputed<[Point[]]>;
export type GetPointTransformerFn = PureComputed<[PointTransformer], PointFn>&
{
  isStartedFromZero?: boolean,
  getPointColor?: PointColorFn,
  isBroad?: boolean,
  getTargetElement: GetTargetElementFn,
};
export type GetTargetElementFn = PureComputed<[any]>;
export type PointColorFn = PureComputed<[string[], number], string>;
export type PointTransformer = Series & {argumentScale: Scale, valueScale: Scale};
