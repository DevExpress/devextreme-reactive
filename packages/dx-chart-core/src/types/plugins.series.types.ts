import { PureComputed } from '@devexpress/dx-core';
import {
  Colors, SeriesList, DataItems, ScalesCache,
} from './chart-core.types';
import {
  Scales, GetSeriesAnimatedStyleFn,
} from './plugins.animation.types';
import { Size } from '@devexpress/dx-react-core';

/** @internal */
export type AddSeriesFn = PureComputed<[SeriesList, DataItems, Colors, any, any]>;
/** @internal */
export type ScaleSeriesPointsFn = PureComputed<[SeriesList, ScalesCache, boolean]>;

type PathPoints = ReadonlyArray<PointComponentProps>;
export type GetPointFieldFn = (point: PointComponentProps) => number;

export interface PathFn {
  (points: PathPoints): string;

  x(): GetPointFieldFn;
  x(f: GetPointFieldFn): this;

  y(): GetPointFieldFn;
  y(f: GetPointFieldFn): this;

  y0?(): GetPointFieldFn;
  y0?(f: GetPointFieldFn): this;

  y1?(): GetPointFieldFn;
  y1?(f: GetPointFieldFn): this;

  x0?(): GetPointFieldFn;
  x0?(f: GetPointFieldFn): this;

  x1?(): GetPointFieldFn;
  x1?(f: GetPointFieldFn): this;

  curve?(): any;
  curve?(c: any): this;

  context(ctx: any): this;
}

interface CommonComponentProps {
  /** A color */
  color: string;
  /** @internal */
  state?: string;
  /** @internal */
  rotated: boolean;
  /** @internal */
  style?: any;
  /** @internal */
  scales: Scales;
  /** @internal */
  getAnimatedStyle: GetSeriesAnimatedStyleFn;
  /** @internal */
  pane: Size;
  /** @internal */
  clipPathId: string;
}

export interface PathComponentProps extends CommonComponentProps {
  /** @internal */
  index: number;
  /** @internal */
  pointComponent?: React.ComponentType<PointComponentProps>;
  /** Coordinates of the series' points */
  coordinates: PathPoints;
}

export interface PointComponentProps extends CommonComponentProps {
  /** @internal */
  seriesIndex: number;
  /** Point index */
  index: number;
  /** Point argument */
  argument: any;
  /** Point value */
  value: any;
  /** coordinate on argument axis */
  arg: number;
  /** coordinate on value axis */
  val: number;
  /** start coordinate on value axis  */
  startVal?: number;
}

export interface SeriesProps {
  /** A series argument field */
  argumentField: string;
  /** A series value field */
  valueField: string;
  /** A series name */
  name?: string;
  /** A series scale name */
  scaleName?: string;
  /** A series color */
  color?: string;
  /** @internal */
  seriesComponent?: React.ComponentType<any>;
  /** @internal */
  pointComponent?: React.ComponentType<any>;
}

export interface PathComponentPathProps extends PathComponentProps {
  /** A function used to calculate the series’ path */
  path?: PathFn;
}

export interface AreaSeriesProps extends SeriesProps {
  /** A component that renders series */
  seriesComponent?: React.ComponentType<AreaSeries.SeriesProps>;
}

// The following namespaces and empty interfaces inside them are added to match generated d.ts
// content with that generated from md files.
// TODO: Remove redundant entities when d.ts generation from md files is removed.

// tslint:disable-next-line: no-namespace
export namespace AreaSeries {
  /** Describes properties passed to a component that renders the series */
  // tslint:disable-next-line: no-shadowed-variable no-empty-interface
  export interface SeriesProps extends PathComponentPathProps { }
  /** Describes properties of a component that renders series */
  // tslint:disable-next-line: no-empty-interface
  export interface PathSeriesProps extends SeriesProps { }
}

export interface LineSeriesProps extends SeriesProps {
  /** A component that renders series */
  seriesComponent?: React.ComponentType<LineSeries.SeriesProps>;
}

// tslint:disable-next-line: no-namespace
export namespace LineSeries {
  /** Describes properties passed to a component that renders the series */
  // tslint:disable-next-line: no-shadowed-variable no-empty-interface
  export interface SeriesProps extends PathComponentPathProps { }
  /** Describes properties of a component that renders series */
  // tslint:disable-next-line: no-empty-interface
  export interface PathSeriesProps extends SeriesProps { }
}

export interface SplineSeriesProps extends SeriesProps {
  /** A component that renders series */
  seriesComponent?: React.ComponentType<SplineSeries.SeriesProps>;
}

// tslint:disable-next-line: no-namespace
export namespace SplineSeries {
  /** Describes properties passed to a component that renders the series */
  // tslint:disable-next-line: no-shadowed-variable no-empty-interface
  export interface SeriesProps extends PathComponentPathProps { }
  /** Describes properties of a component that renders series */
  // tslint:disable-next-line: no-empty-interface
  export interface PathSeriesProps extends SeriesProps { }
}

// tslint:disable-next-line: no-namespace
export namespace BarSeries {
  /** Describes properties passed to a component that renders a bar */
  export interface PointProps extends PointComponentProps {
    /** The bar width in relative units */
    barWidth: number;
    /** The maximum width that the bar can occupy, measured in pixels */
    maxBarWidth: number;
  }
}

export interface BarSeriesProps extends SeriesProps {
  /** The bar width in relative units */
  barWidth?: number;
  /** A component that renders a bar */
  pointComponent?: React.ComponentType<BarSeries.PointProps>;
}

// tslint:disable-next-line: no-namespace
export namespace PieSeries {
  /** Describes properties passed to a component that renders the slice */
  export interface PointProps extends PointComponentProps {
    /** The slice's maximum radius in pixels */
    maxRadius: number;
    /** The inner radius in relative units */
    innerRadius: number;
    /** The outer radius in relative units */
    outerRadius: number;
    /** The slice's start angle */
    startAngle: number;
    /** The slice's end angle */
    endAngle: number;
  }
}

export interface PieSeriesProps extends SeriesProps {
  /** The inner radius in relative units */
  innerRadius?: number;
  /** The outer radius in relative units */
  outerRadius?: number;
  /** A component that renders point */
  pointComponent?: React.ComponentType<PieSeries.PointProps>;
}

// tslint:disable-next-line: no-namespace
export namespace ScatterSeries {
  /** Describes point options */
  export type PointOptions = { size: number };
  /** Describes properties passed to a component that renders the point */
  export interface PointProps extends PointComponentProps {
    /** Point options */
    point: PointOptions;
  }
  // TODO: It is useless and added only because of the scatter-series.md content.
  // Update md file and remove it.
  /** Describes properties passed to a component that renders the series */
  // tslint:disable-next-line: no-shadowed-variable no-empty-interface
  export interface SeriesProps extends PathComponentProps { }
}

export interface ScatterSeriesProps extends SeriesProps {
  /** Point options */
  point?: ScatterSeries.PointOptions;
  /** A component that renders point */
  pointComponent?: React.ComponentType<ScatterSeries.PointProps>;
}
