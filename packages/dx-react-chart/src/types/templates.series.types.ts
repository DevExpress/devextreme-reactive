import {
  Scales, BuildAnimatedStyleGetterFn, TransformedPoint, Series, PiePoint, BarPoint, ScatterPoint,
} from './index';

type PathFn = (points: ReadonlyArray<TransformedPoint>) => string;

interface InternalPointProps {
  /** @internal */
  seriesIndex: number;
  /** @internal */
  state?: string;
  /** @internal */
  style?: any;
  /** @internal */
  scales: Scales;
  /** @internal */
  getAnimatedStyle: BuildAnimatedStyleGetterFn;
}

interface InternalPathProps extends InternalPointProps {
  /** @internal */
  index: number;
}

/** @internal */
export interface PointCollectionProps {
  pointComponent: React.ComponentType<any>;
  coordinates: TransformedPoint[];
  index: number;
  state?: string;
}

export interface AreaSeriesProps extends Series {
  /** A component that renders series */
  seriesComponent: React.ComponentType<AreaSeries.PathSeriesProps>;
}

// tslint:disable-next-line: no-namespace
export namespace AreaSeries {
  /** Describes properties of a component that renders series */
  export interface PathSeriesProps {
    /** A function used to calculate the series’ path */
    path: PathFn;
  }
  /** Describes properties passed to a component that renders the series */
  export interface SeriesProps extends PathSeriesProps, InternalPathProps {
    /** Coordinates of the series’ points */
    coordinates: TransformedPoint[];
    /** A series color */
    color?: string;
    /** @internal */
    pointComponent: React.ComponentType<any>;
  }
}

export interface BarSeriesProps extends Series {
  /** The bar width in relative units */
  barWidth?: number;
  /** A component that renders a bar */
  pointComponent: React.ComponentType<BarSeries.PointProps>;
}

// tslint:disable-next-line: no-namespace
export namespace BarSeries {
  /** Describes properties passed to a component that renders a bar */
  export interface PointProps extends InternalPointProps, BarPoint {}
}

export interface PieSeriesProps extends Series {
  /** The inner radius in relative units */
  innerRadius?: number;
  /** The outer radius in relative units */
  outerRadius?: number;
  /** A component that renders point */
  pointComponent: React.ComponentType<PieSeries.PointProps>;
}

// tslint:disable-next-line: no-namespace
export namespace PieSeries {
  /** Describes properties passed to a component that renders the slice */
  export interface PointProps extends InternalPointProps, PiePoint {}
}

export interface ScatterSeriesProps extends Series {
  /** Point options */
  point: {size: number};
  /** A component that renders point */
  pointComponent: React.ComponentType<ScatterSeries.PointProps>;
}

// tslint:disable-next-line: no-namespace
export namespace ScatterSeries {
  /** Describes properties passed to a component that renders the point */
  export interface PointProps extends InternalPointProps, ScatterPoint {}
  /** Describes properties passed to a component that renders the series. */
  export interface SeriesProps {
    /** Coordinates of the series’ points. */
    coordinates: TransformedPoint[];
    /** Point options */
    point?: { size: number };
    /** A component that renders a series point */
    pointComponent: React.ComponentType<ScatterSeries.PointProps>;
  }
}
