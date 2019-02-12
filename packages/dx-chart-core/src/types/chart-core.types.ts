type DataItem = { readonly [field: string]: any };
export type DataItems = ReadonlyArray<DataItem>;

export type DomainItems = ReadonlyArray<any>;

// TODO: Find a way to use types from "d3-scale".
export interface Scale {
  (value: any): number;
  // A function that returns an array of ticks.
  ticks?: (ticks?: number) => DomainItems;
  // A function that sets (if the domain parameter is an array) or
  // gets (if the domain parameter is undefined) the current domain.
  domain: (domain?: DomainItems) => any;
  // A function that returns a tick formatter function.
  tickFormat?: (count?: number, format?: string) => GetFormatFn;
  // A function that returns each band’s width.
  bandwidth?: () => number;
  // A function that sets (if the range parameter is an array) or
  // gets (if the range parameter is undefined) the scale’s current range.
  range: (range?: DomainItems) => any;
  // Returns an exact copy of this scale
  copy: () => Scale;
  // Enables or disables clamping
  clamp?: (clamp: boolean) => Scale;
  // A function that sets a scale’s inner padding and returns the current scale
  paddingInner?: (arg: number) => Scale;
  // A function that sets a scale’s outer padding and returns the current scale
  paddingOuter?: (arg: number) => Scale;
}

export type ScalesCache = {
  readonly [key: string]: Scale,
};

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
  readonly point: { size: number };
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

export type GetFormatFn = (tick: any) => string;

export interface Series {
  readonly index: number;
  readonly scaleName: string;
  readonly symbolName: unique symbol;
  readonly name: string;
  readonly getValueDomain?: GetValueDomainFn;
  readonly points: PointList;
  readonly color: string;
  readonly argumentField: string;
  readonly valueField: string;
  readonly createHitTester: CreateHitTesterFn;
  readonly getPointTransformer: GetPointTransformerFn;
  readonly pointComponent: React.ComponentType<any>;
  readonly state: string;
  readonly seriesComponent: React.ComponentType<any>;
}
export type SeriesList = ReadonlyArray<Series>;

export type GetValueDomainFn = (points: PointList) => DomainItems;

export type Palette = ReadonlyArray<string>;

type PointColorFn = (palette: Palette, index: number) => string;
export type Rect = Readonly<[number, number, number, number]>;
type GetTargetElementFn = (point: TransformedPoint) => Rect;
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

export type PointDistance = {
  readonly index: number,
  readonly distance: number,
};

export type Location = Readonly<[number, number]>;

type HitTestResult = {
  readonly points: ReadonlyArray<PointDistance>;
} | null;
export type HitTestFn = (location: Location) => HitTestResult;

export type CreateHitTesterFn = (points: PointList) => HitTestFn;
