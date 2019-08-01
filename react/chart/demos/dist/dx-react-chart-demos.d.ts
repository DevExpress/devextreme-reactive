import * as React from 'react';
import {
  
} from '@devexpress/dx-react-chart';

// -------------------------------------------------------------------------------------------------
// AreaSeries
// -------------------------------------------------------------------------------------------------

import {
  AreaSeries as AreaSeriesBase,
} from '@devexpress/dx-react-chart';

export interface AreaSeriesProps {
  /** A series name. */
  name?: string;
  /** The name of a data field that provides series point values. */
  valueField?: string;
  /** The name of a data field that provides series point argument values. */
  argumentField?: string;
  /** The associated axis. */
  axisName?: string;
  /** The associated stack. */
  stack?: string;
  /** Point options. */
  point?: { size : number };
  /** A component that renders the series. */
  seriesComponent?: React.ComponentType<AreaSeriesBase.SeriesProps>;
  /** A component that renders a series point. */
  pointComponent?: React.ComponentType<AreaSeriesBase.PointProps>;
}

/** The AreaSeries plugin visualizes the area series. */
export declare const AreaSeries: React.ComponentType<AreaSeriesProps> & {
  /** A component that renders the series. */
  Path: React.ComponentType<AreaSeriesBase.SeriesProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a series point. */
  Point: React.ComponentType<AreaSeriesBase.PointProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// ArgumentAxis
// -------------------------------------------------------------------------------------------------

import {
  ArgumentAxis as ArgumentAxisBase,
} from '@devexpress/dx-react-chart';

export interface ArgumentAxisProps {
  /** The tick size. */
  tickSize?: number;
  /** The axis position. */
  position?: 'bottom' | 'top';
  /** The axis name. */
  name?: string;
  /** The indent from the axis. */
  indentFromAxis?: number;
  /** Axis type. */
  type?: 'band' | 'linear';
  /** A component that renders the axis root layout. */
  rootComponent?: React.ComponentType<ArgumentAxisBase.RootProps>;
  /** A component that renders a tick. */
  tickComponent?: React.ComponentType<ArgumentAxisBase.TickProps>;
  /** A component that renders the axis label. */
  labelComponent?: React.ComponentType<ArgumentAxisBase.LabelProps>;
  /** A component that renders the axis line. */
  lineComponent?: React.ComponentType<ArgumentAxisBase.LineProps>;
}

/** The ArgumentAxis plugin visualizes the argument axis. */
export declare const ArgumentAxis: React.ComponentType<ArgumentAxisProps> & {
  /** A component that renders the axis root layout. */
  Root: React.ComponentType<ArgumentAxisBase.RootProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the tick. */
  Tick: React.ComponentType<ArgumentAxisBase.TickProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the axis label. */
  Label: React.ComponentType<ArgumentAxisBase.LabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the axis line. */
  Line: React.ComponentType<ArgumentAxisBase.LineProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// BarSeries
// -------------------------------------------------------------------------------------------------

import {
  BarSeries as BarSeriesBase,
} from '@devexpress/dx-react-chart';

export interface BarSeriesProps {
  /** A series name. */
  name?: string;
  /** The name of a data field that provides series point values. */
  valueField?: string;
  /** The name of a data field that provides series point argument values. */
  argumentField?: string;
  /** The associated axis. */
  axisName?: string;
  /** The associated stack. */
  stack?: string;
  /** The bar width in relative units. */
  barWidth?: number;
  /** The bar group width in relative units. */
  groupWidth?: number;
  /** A component that renders a bar. */
  pointComponent?: React.ComponentType<BarSeriesBase.PointProps>;
}

/** The BarSeries plugin visualizes the bar series. */
export declare const BarSeries: React.ComponentType<BarSeriesProps> & {
  /** A component that renders a bar. */
  Point: React.ComponentType<BarSeriesBase.PointProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// Chart
// -------------------------------------------------------------------------------------------------

import {
  Chart as ChartBase,
} from '@devexpress/dx-react-chart';

export interface ChartProps {
  /** An array containing custom data. */
  data?: Array<any>;
  /** Chart width. */
  width?: number;
  /** Chart height. */
  height?: number;
  /** A component that renders the chart root layout. */
  rootComponent?: React.ComponentType<ChartBase.RootProps>;
}

/** The Chart is a root container component designed to process and display data specified via the `data` property. The Chart's functionality  is implemented in several plugins specified as child components. */
export declare const Chart: React.ComponentType<ChartProps>;

// -------------------------------------------------------------------------------------------------
// Grid
// -------------------------------------------------------------------------------------------------

import {
  Grid as GridBase,
} from '@devexpress/dx-react-chart';

export interface GridProps {
  /** An axis name. */
  name?: string;
  /** A component that renders a grid line. */
  lineComponent?: React.ComponentType<GridBase.LineProps>;
}

/** The Grid plugin visualizes a grid for the specified axis. */
export declare const Grid: React.ComponentType<GridProps> & {
  /** A component that renders a grid line. */
  Line: React.ComponentType<GridBase.LineProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// Legend
// -------------------------------------------------------------------------------------------------

import {
  Legend as LegendBase,
} from '@devexpress/dx-react-chart';

export interface LegendProps {
  /** A component that renders a marker. */
  markerComponent?: React.ComponentType<object>;
  /** A component that renders the legend label. */
  labelComponent?: React.ComponentType<LegendBase.LabelProps>;
  /** A component that renders the legend's root layout. */
  rootComponent?: React.ComponentType<LegendBase.RootProps>;
  /** A component that renders a legend item. */
  itemComponent?: React.ComponentType<LegendBase.ItemProps>;
  /** The legend position. */
  position?: 'left' | 'right' | 'top' | 'bottom';
}

/** The Legend plugin visualizes the legend. */
export declare const Legend: React.ComponentType<LegendProps> & {
  /** A component that renders the root layout. */
  Root: React.ComponentType<LegendBase.RootProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders an item. */
  Item: React.ComponentType<LegendBase.ItemProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a marker. */
  Marker: React.ComponentType<object & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the label. */
  Label: React.ComponentType<LegendBase.LabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// LineSeries
// -------------------------------------------------------------------------------------------------

import {
  LineSeries as LineSeriesBase,
} from '@devexpress/dx-react-chart';

export interface LineSeriesProps {
  /** A series name. */
  name?: string;
  /** The name of a data field that provides series point values. */
  valueField?: string;
  /** The name of a data field that provides series point argument values. */
  argumentField?: string;
  /** The associated axis. */
  axisName?: string;
  /** The associated stack. */
  stack?: string;
  /** Point options. */
  point?: { size : number };
  /** A component that renders the series. */
  seriesComponent?: React.ComponentType<LineSeriesBase.SeriesProps>;
  /** A component that renders a point. */
  pointComponent?: React.ComponentType<LineSeriesBase.PointProps>;
}

/** The LineSeries plugin visualizes the line series. */
export declare const LineSeries: React.ComponentType<LineSeriesProps> & {
  /** A component that renders the series. */
  Path: React.ComponentType<LineSeriesBase.SeriesProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a series point. */
  Point: React.ComponentType<LineSeriesBase.PointProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// PieSeries
// -------------------------------------------------------------------------------------------------

import {
  PieSeries as PieSeriesBase,
} from '@devexpress/dx-react-chart';

export interface PieSeriesProps {
  /** A series name. */
  name?: string;
  /** The name of a data field that provides series point values. */
  valueField?: string;
  /** The name of a data field that provides series point argument values. */
  argumentField?: string;
  /** The inner radius in relative units. */
  innerRadius?: number;
  /** The outer radius in relative units. */
  outerRadius?: number;
  /** A component that renders a slice. */
  pointComponent?: React.ComponentType<PieSeriesBase.PointProps>;
}

/** The PieSeries plugin visualizes pie series. */
export declare const PieSeries: React.ComponentType<PieSeriesProps> & {
  /** A component that renders a slice. */
  Point: React.ComponentType<PieSeriesBase.PointProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// ScatterSeries
// -------------------------------------------------------------------------------------------------

import {
  ScatterSeries as ScatterSeriesBase,
} from '@devexpress/dx-react-chart';

export interface ScatterSeriesProps {
  /** A series name. */
  name?: string;
  /** The name of a data field that provides series point values. */
  valueField?: string;
  /** The name of a data field that provides series point argument values. */
  argumentField?: string;
  /** The associated axis. */
  axisName?: string;
  /** Point options. */
  point?: { size : number };
  /** A component that renders a series point. */
  pointComponent?: React.ComponentType<ScatterSeriesBase.PointProps>;
}

/** The ScatterSeries plugin visualizes the scatter series. */
export declare const ScatterSeries: React.ComponentType<ScatterSeriesProps> & {
  /** A component that renders a series point. */
  Point: React.ComponentType<ScatterSeriesBase.PointProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// SplineSeries
// -------------------------------------------------------------------------------------------------

import {
  SplineSeries as SplineSeriesBase,
} from '@devexpress/dx-react-chart';

export interface SplineSeriesProps {
  /** A series name. */
  name?: string;
  /** The name of a data field that provides series point values. */
  valueField?: string;
  /** The name of a data field that provides series point argument values. */
  argumentField?: string;
  /** The associated axis. */
  axisName?: string;
  /** The associated stack. */
  stack?: string;
  /** Point options. */
  point?: { size : number };
  /** A component that renders the series. */
  seriesComponent?: React.ComponentType<SplineSeriesBase.SeriesProps>;
  /** A component that renders a series point. */
  pointComponent?: React.ComponentType<SplineSeriesBase.PointProps>;
}

/** The SplineSeries plugin visualizes the spline series. */
export declare const SplineSeries: React.ComponentType<SplineSeriesProps> & {
  /** A component that renders the series. */
  Path: React.ComponentType<SplineSeriesBase.SeriesProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders a series point. */
  Point: React.ComponentType<SplineSeriesBase.PointProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// Title
// -------------------------------------------------------------------------------------------------

import {
  Title as TitleBase,
} from '@devexpress/dx-react-chart';

export interface TitleProps {
  /** A component that renders the title. */
  textComponent?: React.ComponentType<TitleBase.TextProps>;
  /** The title text. */
  text?: string;
  /** The title position. */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/** The Title plugin renders the chart title. */
export declare const Title: React.ComponentType<TitleProps> & {
  /** A component that renders the title. */
  Text: React.ComponentType<TitleBase.TextProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};

// -------------------------------------------------------------------------------------------------
// ValueAxis
// -------------------------------------------------------------------------------------------------

import {
  ValueAxis as ValueAxisBase,
} from '@devexpress/dx-react-chart';

export interface ValueAxisProps {
  /** The tick size. */
  tickSize?: number;
  /** The axis position. */
  position?: 'left' | 'right';
  /** The axis name. */
  name?: string;
  /** The indent from the axis. */
  indentFromAxis?: number;
  /** Axis type. */
  type?: 'band' | 'linear';
  /** A component that renders the axis root layout. */
  rootComponent?: React.ComponentType<ValueAxisBase.RootProps>;
  /** A component that renders a tick. */
  tickComponent?: React.ComponentType<ValueAxisBase.TickProps>;
  /** A component that renders the axis label. */
  labelComponent?: React.ComponentType<ValueAxisBase.LabelProps>;
  /** A component that renders the axis line. */
  lineComponent?: React.ComponentType<ValueAxisBase.LineProps>;
}

/** The ValueAxis plugin visualizes the value axis. */
export declare const ValueAxis: React.ComponentType<ValueAxisProps> & {
  /** A component that renders the axis root layout. */
  Root: React.ComponentType<ValueAxisBase.RootProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the tick. */
  Tick: React.ComponentType<ValueAxisBase.TickProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the axis label. */
  Label: React.ComponentType<ValueAxisBase.LabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
  /** A component that renders the axis line. */
  Line: React.ComponentType<ValueAxisBase.LineProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
};
