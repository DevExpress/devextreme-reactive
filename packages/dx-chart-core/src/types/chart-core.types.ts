type DataItem = { readonly [field: string]: any };
export type DataItems = ReadonlyArray<DataItem>;

export type DomainItems = ReadonlyArray<any>;

export type NumberArray = [number, number];

// TODO: Find a way to use types from "d3-scale".
export interface ScaleObject {
  (value: any): number;
  /** A function that returns an array of ticks  */
  ticks?(ticks?: number): DomainItems;
  /** A function that sets the current domain */
  domain(domain: DomainItems): this;
  /** A function that gets the current domain */
  domain(): DomainItems;
  /** A function that returns a tick formatter function */
  tickFormat?(count?: number, format?: string): GetFormatFn;
  /** A function that returns each band’s width */
  bandwidth?(): number;
  /** A function that sets the current range */
  range(range: NumberArray): this;
  /** A function that gets the current range */
  range(): NumberArray;
  /** Returns an exact copy of this scale */
  copy(): this;
  /** Enables or disables clamping */
  clamp?(clamp: boolean): this;
  /** A function that sets a scale’s inner padding and returns the current scale */
  paddingInner?(arg: number): this;
  /** A function that sets a scale’s outer padding and returns the current scale */
  paddingOuter?(arg: number): this;
  /** A function that returns the corresponding value from the domain */
  invert?(value: number): any;
}

export type ScalesCache = {
  readonly [key: string]: ScaleObject,
};

export interface Point {
  /** @internal */
  readonly argument: any;
  /** Point value  */
  readonly value: any;
  /** Point index */
  readonly index: number;
  /** Point color */
  readonly color: string;
  /** @internal */
  readonly rotated: boolean;
}

/** @internal */
export type PointList = ReadonlyArray<Point>;

// Though this type highly intersects with *PointComponentProps* there is no actual
// relation between them. One is internal object other is set of component properties.
// TODO: Reorganize types to remove the false similarity.
export interface TransformedPoint extends Point {
  /** The point's translated argument */
  readonly arg: number;
  /** The point's translated value */
  readonly val: number;
  // Let's keep it here (instead of creating a separate interface with single field) for now.
  /** The point's translated start value */
  readonly startVal?: number;
}

/** The object that points at a clicked series */
export interface SeriesRef {
  /** Series name */
  readonly series: string;
  /** The point’s index within the data array */
  readonly point: number;
}
export type TargetList = ReadonlyArray<SeriesRef>;

export type GetFormatFn = (tick: any) => string;

// TODO: The issue is similar to that of *TransformedPoint*.
/** @internal */
export interface Series {
  /** A series name */
  readonly name: string;
  /** The name of a data field that provides series point values */
  readonly valueField: string;
  /** The name of a data field that provides series point argument values */
  readonly argumentField: string;
  /** The associated scale */
  readonly scaleName?: string;
  /** A series color */
  readonly color: string;
  /** @internal */
  readonly seriesComponent?: React.ComponentType<any>;
  /** @internal */
  readonly pointComponent?: React.ComponentType<any>;
  /** @internal */
  readonly index: number;
  /** @internal */
  readonly getValueDomain?: GetValueDomainFn;
  /** @internal */
  readonly points: PointList;
  /** @internal */
  readonly createHitTester: CreateHitTesterFn;
  /** @internal */
  readonly getPointTransformer: GetPointTransformerFn;
  /** @internal */
  readonly state?: string;
  /** @internal */
  readonly symbolName: unique symbol;
  /** @internal */
  readonly rotated: boolean;
}
/** @internal */
export type SeriesList = ReadonlyArray<Series>;

/** @internal */
export type GetValueDomainFn = (points: PointList) => DomainItems;

export type Colors = ReadonlyArray<string>;

type PointColorFn = (palette: Colors, index: number) => string;
/** @internal */
export type Rect = Readonly<[number, number, number, number]>;
type GetTargetElementFn = (point: TransformedPoint) => Rect;
type TransformPointFn = (point: Point) => TransformedPoint;
/** @internal */
export type GetPointTransformerFnRaw = (series: {
  readonly points: PointList;
  readonly argumentScale: ScaleObject;
  readonly valueScale: ScaleObject;
  readonly rotated: boolean;
}) => TransformPointFn;

/** @internal */
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
export type Location = Readonly<NumberArray>;
type HitTestResult = {
  readonly points: ReadonlyArray<PointDistance>;
} | null;
export type HitTestFn = (location: Location) => HitTestResult;
/** @internal */
export type CreateHitTesterFn = (points: PointList, rotated: boolean) => HitTestFn;
