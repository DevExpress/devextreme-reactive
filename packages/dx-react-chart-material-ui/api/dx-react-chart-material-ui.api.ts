// WARNING: Unsupported export: SeriesProps
// WARNING: Unsupported export: PathSeriesProps
// @public (undocumented)
module AreaSeries {
}

// @public (undocumented)
interface AreaSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  scaleName?: string;
  seriesComponent?: React.ComponentType<AreaSeriesBase.SeriesProps>;
  valueField?: string;
}

// WARNING: Unsupported export: RootProps
// WARNING: Unsupported export: LineProps
// WARNING: Unsupported export: LabelProps
// @public (undocumented)
module ArgumentAxis {
}

// @public (undocumented)
interface ArgumentAxisProps {
  gridComponent?: React.ComponentType<ArgumentAxisBase.LineProps>;
  indentFromAxis?: number;
  labelComponent?: React.ComponentType<ArgumentAxisBase.LabelProps>;
  lineComponent?: React.ComponentType<ArgumentAxisBase.LineProps>;
  position?: 'bottom' | 'top';
  rootComponent?: React.ComponentType<ArgumentAxisBase.RootProps>;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent?: React.ComponentType<ArgumentAxisBase.LineProps>;
  tickFormat?: (scale: ScaleObject) => (tick: string) => string;
  tickSize?: number;
}

// WARNING: Unsupported export: PointProps
// @public (undocumented)
module BarSeries {
}

// @public (undocumented)
interface BarSeriesProps {
  argumentField?: string;
  barWidth?: number;
  color?: string;
  name?: string;
  pointComponent?: React.ComponentType<BarSeriesBase.PointProps>;
  scaleName?: string;
  valueField?: string;
}

// WARNING: Unsupported export: RootProps
// WARNING: Unsupported export: LabelProps
// @public (undocumented)
module Chart {
}

// @public (undocumented)
interface ChartProps {
  data?: Array<any>;
  height?: number;
  rootComponent?: React.ComponentType<ChartBase.RootProps>;
  width?: number;
}

// WARNING: Unsupported export: LabelProps
// WARNING: Unsupported export: RootProps
// WARNING: Unsupported export: ItemProps
// @public (undocumented)
module Legend {
}

// @public (undocumented)
interface LegendProps {
  itemComponent?: React.ComponentType<LegendBase.ItemProps>;
  labelComponent?: React.ComponentType<LegendBase.LabelProps>;
  markerComponent?: React.ComponentType<object>;
  position?: 'left' | 'right' | 'top' | 'bottom';
  rootComponent?: React.ComponentType<LegendBase.RootProps>;
}

// WARNING: Unsupported export: SeriesProps
// WARNING: Unsupported export: PathSeriesProps
// @public (undocumented)
module LineSeries {
}

// @public (undocumented)
interface LineSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  scaleName?: string;
  seriesComponent?: React.ComponentType<LineSeriesBase.SeriesProps>;
  valueField?: string;
}

// WARNING: Unsupported export: PointProps
// @public (undocumented)
module PieSeries {
}

// @public (undocumented)
interface PieSeriesProps {
  argumentField?: string;
  innerRadius?: number;
  name?: string;
  outerRadius?: number;
  pointComponent?: React.ComponentType<PieSeriesBase.PointProps>;
  valueField?: string;
}

// WARNING: Unsupported export: PointProps
// WARNING: Unsupported export: SeriesProps
// @public (undocumented)
module ScatterSeries {
}

// @public (undocumented)
interface ScatterSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  point?: {
    size: number;
  }
  pointComponent?: React.ComponentType<ScatterSeriesBase.PointProps>;
  scaleName?: string;
  valueField?: string;
}

// WARNING: Unsupported export: SeriesProps
// WARNING: Unsupported export: PathSeriesProps
// @public (undocumented)
module SplineSeries {
}

// @public (undocumented)
interface SplineSeriesProps {
  argumentField?: string;
  color?: string;
  name?: string;
  scaleName?: string;
  seriesComponent?: React.ComponentType<SplineSeriesBase.SeriesProps>;
  valueField?: string;
}

// WARNING: Unsupported export: TextProps
// @public (undocumented)
module Title {
}

// @public (undocumented)
interface TitleProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  text: string;
  textComponent: React.ComponentType<TitleBase.TextProps>;
}

// WARNING: Unsupported export: OverlayProps
// WARNING: Unsupported export: ContentProps
// @public (undocumented)
module Tooltip {
}

// @public (undocumented)
interface TooltipProps {
  contentComponent?: React.ComponentType<TooltipBase.ContentProps>;
  defaultTargetItem?: SeriesRef;
  onTargetItemChange?: (target: SeriesRef) => void;
  overlayComponent?: React.ComponentType<TooltipBase.OverlayProps>;
  targetItem?: SeriesRef;
}

// WARNING: Unsupported export: RootProps
// WARNING: Unsupported export: LineProps
// WARNING: Unsupported export: LabelProps
// @public (undocumented)
module ValueAxis {
}

// @public (undocumented)
interface ValueAxisProps {
  gridComponent?: React.ComponentType<ValueAxisBase.LineProps>;
  indentFromAxis?: number;
  labelComponent?: React.ComponentType<ValueAxisBase.LabelProps>;
  lineComponent?: React.ComponentType<ValueAxisBase.LineProps>;
  position?: 'left' | 'right';
  rootComponent?: React.ComponentType<ValueAxisBase.RootProps>;
  scaleName?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent?: React.ComponentType<ValueAxisBase.LineProps>;
  tickFormat?: (scale: ScaleObject) => (tick: string) => string;
  tickSize?: number;
}

// (No @packagedocumentation comment for this package)
