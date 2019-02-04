import { CustomFunction } from '@devexpress/dx-core';
import { CreateHitTesterFn } from './utils.types';

type RangeFn = CustomFunction<[any[]?], any[]>;
type BandwidthFn = CustomFunction<[], number>;
type DomainFn = CustomFunction<[any[]?], any>;
type TicksFn = CustomFunction<[number?], any[]>;
type PaddingInnerFn = CustomFunction<[number], Scale>;
type PaddingOuterFn = CustomFunction<[number], Scale>;
type CopyFn = CustomFunction<[], Scale>;
type ClampFn = CustomFunction<[boolean], Scale>;

type DataItem = { readonly [field: string]: any };
export type DataItems = ReadonlyArray<DataItem>;

export type Domain = ReadonlyArray<any>;

// TODO: Find a way to use types from "d3-scale".
export interface Scale {
  (value: any): number;
  // A function that returns an array of ticks.
  ticks?: TicksFn;
  // A function that sets (if the domain parameter is an array) or
  // gets (if the domain parameter is undefined) the current domain.
  domain: DomainFn;
  // A function that returns a tick formatter function.
  tickFormat?: (count?: number, format?: string) => GetFormatFn;
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

export interface Point {
  // Point argument
  readonly argument: any;
  // Point value
  readonly value: any;
  // Point index
  readonly index: number;
  // Point color
  readonly color: string;
}

export type PointList = ReadonlyArray<Point>;

export interface TransformedPoint extends Point {
  // The point's x coordinate
  readonly x: number;
  // The point's y coordinate'
  readonly y: number;
  // Let's keep it here (instead of creating a separate interface with single field) for now.
  // The point's y1 coordinate
  readonly y1?: number;
}

export interface BarPoint extends TransformedPoint {
  // The bar's width in relative units
  readonly barWidth: number;
  // The maximum width that the bar can occupy, measured in pixels
  readonly maxBarWidth: number;
}

export interface ScatterPoint extends TransformedPoint {
  // Point options
  point: { size: number };
}

export interface PiePoint extends TransformedPoint {
  // The slice's maximum radius in pixels
  readonly maxRadius: number;
  // The inner radius in relative units
  readonly innerRadius: number;
  // The outer radius in relative units
  readonly outerRadius: number;
  // The slice's start angle
  readonly startAngle: number;
  // The slice's end angle
  readonly endAngle: number;
}

export interface Target {
  // Series name
  readonly series: string;
  // The point’s index within the data array
  readonly point: number;
}
export type TargetList = ReadonlyArray<Target>;

export interface Stack {
  // A list of series names
  series: string[];
}
export type StackList = ReadonlyArray<Stack>;

export type GetFormatFn = (tick: any) => string;

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
  createHitTester: CreateHitTesterFn,
  getPointTransformer: GetPointTransformerFn,
};
export type SeriesList = ReadonlyArray<Series>;

export type GetValueDomainFn = (points: PointList) => Domain;

export type Palette = ReadonlyArray<string>;

type PointColorFn = (palette: Palette, index: number) => string;
export type TargetElement = {
  readonly x: number;
  readonly y: number;
  readonly d: string;
};
type GetTargetElementFn = (point: TransformedPoint) => TargetElement;
type TransformPointFn = (point: Point) => TransformedPoint;
export type GetPointTransformerFnRaw = (series: {
  readonly points: PointList;
  readonly argumentScale: Scale;
  readonly valueScale: Scale;
}) => TransformPointFn;
export type GetPointTransformerFn = GetPointTransformerFnRaw & {
  isStartedFromZero?: boolean,
  getPointColor?: PointColorFn,
  isBroad?: boolean,
  getTargetElement: GetTargetElementFn,
};
