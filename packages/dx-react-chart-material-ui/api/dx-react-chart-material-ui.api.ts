// @public (undocumented)
namespace AreaSeries {
  type SeriesProps = AreaSeries_2.SeriesProps;
}

// @public (undocumented)
namespace AreaSeries {
  type PathSeriesProps = AreaSeries_2.PathSeriesProps;
}

// @public
declare const AreaSeries: React.ComponentType<AreaSeriesProps> & {
  Path: React.ComponentType<AreaSeries_2.PathSeriesProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface AreaSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  scaleName?: string;
  seriesComponent?: React.ComponentType<AreaSeries_2.SeriesProps>;
  valueField?: string;
}

// @public (undocumented)
namespace ArgumentAxis {
  type RootProps = ArgumentAxis_2.RootProps;
}

// @public (undocumented)
namespace ArgumentAxis {
  type LineProps = ArgumentAxis_2.LineProps;
}

// @public (undocumented)
namespace ArgumentAxis {
  type LabelProps = ArgumentAxis_2.LabelProps;
}

// @public
declare const ArgumentAxis: React.ComponentType<ArgumentAxisProps> & {
  Root: React.ComponentType<ArgumentAxis_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Tick: React.ComponentType<ArgumentAxis_2.LineProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Label: React.ComponentType<ArgumentAxis_2.LabelProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Line: React.ComponentType<ArgumentAxis_2.LineProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Grid: React.ComponentType<ArgumentAxis_2.LineProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ArgumentAxisProps {
  gridComponent?: React.ComponentType<ArgumentAxis_2.LineProps>;
  indentFromAxis?: number;
  labelComponent?: React.ComponentType<ArgumentAxis_2.LabelProps>;
  lineComponent?: React.ComponentType<ArgumentAxis_2.LineProps>;
  position?: 'bottom' | 'top';
  rootComponent?: React.ComponentType<ArgumentAxis_2.RootProps>;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent?: React.ComponentType<ArgumentAxis_2.LineProps>;
  tickFormat?: (scale: ScaleObject) => (tick: string) => string;
  tickSize?: number;
}

// @public (undocumented)
namespace BarSeries {
  type PointProps = BarSeries_2.PointProps;
}

// @public
declare const BarSeries: React.ComponentType<BarSeriesProps> & {
  Point: React.ComponentType<BarSeries_2.PointProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface BarSeriesProps {
  argumentField?: string;
  barWidth?: number;
  color?: string;
  name?: string;
  pointComponent?: React.ComponentType<BarSeries_2.PointProps>;
  scaleName?: string;
  valueField?: string;
}

// @public (undocumented)
namespace Chart {
  type RootProps = Chart_2.RootProps;
}

// @public (undocumented)
namespace Chart {
  type LabelProps = Chart_2.LabelProps;
}

// @public
declare const Chart: React.ComponentType<ChartProps> & {
  Label: React.ComponentType<Chart_2.LabelProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ChartProps {
  data?: Array<any>;
  height?: number;
  rootComponent?: React.ComponentType<Chart_2.RootProps>;
  width?: number;
}

// @public (undocumented)
namespace Legend {
  type LabelProps = Legend_2.LabelProps;
}

// @public (undocumented)
namespace Legend {
  type RootProps = Legend_2.RootProps;
}

// @public (undocumented)
namespace Legend {
  type ItemProps = Legend_2.ItemProps;
}

// @public
declare const Legend: React.ComponentType<LegendProps> & {
  Root: React.ComponentType<Legend_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Item: React.ComponentType<Legend_2.ItemProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Marker: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Label: React.ComponentType<Legend_2.LabelProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface LegendProps {
  itemComponent?: React.ComponentType<Legend_2.ItemProps>;
  labelComponent?: React.ComponentType<Legend_2.LabelProps>;
  markerComponent?: React.ComponentType<object>;
  position?: 'left' | 'right' | 'top' | 'bottom';
  rootComponent?: React.ComponentType<Legend_2.RootProps>;
}

// @public (undocumented)
namespace LineSeries {
  type SeriesProps = LineSeries_2.SeriesProps;
}

// @public (undocumented)
namespace LineSeries {
  type PathSeriesProps = LineSeries_2.PathSeriesProps;
}

// @public
declare const LineSeries: React.ComponentType<LineSeriesProps> & {
  Path: React.ComponentType<LineSeries_2.PathSeriesProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface LineSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  scaleName?: string;
  seriesComponent?: React.ComponentType<LineSeries_2.SeriesProps>;
  valueField?: string;
}

// @public (undocumented)
namespace PieSeries {
  type PointProps = PieSeries_2.PointProps;
}

// @public
declare const PieSeries: React.ComponentType<PieSeriesProps> & {
  Point: React.ComponentType<PieSeries_2.PointProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface PieSeriesProps {
  argumentField?: string;
  innerRadius?: number;
  name?: string;
  outerRadius?: number;
  pointComponent?: React.ComponentType<PieSeries_2.PointProps>;
  valueField?: string;
}

// @public (undocumented)
namespace ScatterSeries {
  type PointProps = ScatterSeries_2.PointProps;
}

// @public (undocumented)
namespace ScatterSeries {
  type SeriesProps = ScatterSeries_2.SeriesProps;
}

// @public
declare const ScatterSeries: React.ComponentType<ScatterSeriesProps> & {
  Path: React.ComponentType<ScatterSeries_2.SeriesProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Point: React.ComponentType<ScatterSeries_2.PointProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ScatterSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  point?: { // (undocumented)
 size : number };
  pointComponent?: React.ComponentType<ScatterSeries_2.PointProps>;
  scaleName?: string;
  valueField?: string;
}

// @public (undocumented)
namespace SplineSeries {
  type SeriesProps = SplineSeries_2.SeriesProps;
}

// @public (undocumented)
namespace SplineSeries {
  type PathSeriesProps = SplineSeries_2.PathSeriesProps;
}

// @public
declare const SplineSeries: React.ComponentType<SplineSeriesProps> & {
  Path: React.ComponentType<SplineSeries_2.PathSeriesProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface SplineSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  scaleName?: string;
  seriesComponent?: React.ComponentType<SplineSeries_2.SeriesProps>;
  valueField?: string;
}

// @public (undocumented)
namespace Title {
  type TextProps = Title_2.TextProps;
}

// @public
declare const Title: React.ComponentType<TitleProps> & {
  Text: React.ComponentType<Title_2.TextProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TitleProps {
  position?: 'top' | 'bottom';
  text?: string;
  textComponent?: React.ComponentType<Title_2.TextProps>;
}

// @public (undocumented)
namespace Tooltip {
  type OverlayProps = Tooltip_2.OverlayProps;
}

// @public (undocumented)
namespace Tooltip {
  type ContentProps = Tooltip_2.ContentProps;
}

// @public
declare const Tooltip: React.ComponentType<TooltipProps> & {
  Overlay: React.ComponentType<Tooltip_2.OverlayProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Content: React.ComponentType<Tooltip_2.ContentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TooltipProps {
  contentComponent?: React.ComponentType<Tooltip_2.ContentProps>;
  defaultTargetItem?: SeriesRef;
  onTargetItemChange?: (target: SeriesRef) => void;
  overlayComponent?: React.ComponentType<Tooltip_2.OverlayProps>;
  targetItem?: SeriesRef;
}

// @public (undocumented)
namespace ValueAxis {
  type RootProps = ValueAxis_2.RootProps;
}

// @public (undocumented)
namespace ValueAxis {
  type LineProps = ValueAxis_2.LineProps;
}

// @public (undocumented)
namespace ValueAxis {
  type LabelProps = ValueAxis_2.LabelProps;
}

// @public
declare const ValueAxis: React.ComponentType<ValueAxisProps> & {
  Root: React.ComponentType<ValueAxis_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Tick: React.ComponentType<ValueAxis_2.LineProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Label: React.ComponentType<ValueAxis_2.LabelProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Line: React.ComponentType<ValueAxis_2.LineProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Grid: React.ComponentType<ValueAxis_2.LineProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ValueAxisProps {
  gridComponent?: React.ComponentType<ValueAxis_2.LineProps>;
  indentFromAxis?: number;
  labelComponent?: React.ComponentType<ValueAxis_2.LabelProps>;
  lineComponent?: React.ComponentType<ValueAxis_2.LineProps>;
  position?: 'left' | 'right';
  rootComponent?: React.ComponentType<ValueAxis_2.RootProps>;
  scaleName?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent?: React.ComponentType<ValueAxis_2.LineProps>;
  tickFormat?: (scale: ScaleObject) => (tick: string) => string;
  tickSize?: number;
}


// (No @packageDocumentation comment for this package)
