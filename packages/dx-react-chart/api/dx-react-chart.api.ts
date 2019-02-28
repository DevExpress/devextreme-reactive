// @public
declare const Animation: React.ComponentType<AnimationProps>;

// @public (undocumented)
interface AnimationProps {
}

// @public (undocumented)
namespace AreaSeries {
  interface SeriesProps {
    color: string;
    coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number, // (undocumented)
 y1: number }>;
  }
}

// @public (undocumented)
namespace AreaSeries {
  interface PathSeriesProps extends AreaSeries.SeriesProps {
    path?: (coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number, // (undocumented)
 y1: number }>) => string;
  }
}

// @public
declare const AreaSeries: React.ComponentType<AreaSeriesProps>;

// @public (undocumented)
interface AreaSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  scaleName?: string;
  seriesComponent: React.ComponentType<AreaSeries.SeriesProps>;
  valueField: string;
}

// @public (undocumented)
namespace ArgumentAxis {
  interface RootProps {
    children: React.ReactNode;
    x: number;
    y: number;
  }
}

// @public (undocumented)
namespace ArgumentAxis {
  interface LineProps {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }
}

// @public (undocumented)
namespace ArgumentAxis {
  interface LabelProps {
    dominantBaseline: 'hanging' | 'middle' | 'baseline';
    text: string | number;
    textAnchor: 'start' | 'middle' | 'end';
    x: number;
    y: number;
  }
}

// @public
declare const ArgumentAxis: React.ComponentType<ArgumentAxisProps>;

// @public (undocumented)
interface ArgumentAxisProps {
  gridComponent: React.ComponentType<ArgumentAxis.LineProps>;
  indentFromAxis?: number;
  labelComponent: React.ComponentType<ArgumentAxis.LabelProps>;
  lineComponent: React.ComponentType<ArgumentAxis.LineProps>;
  position?: 'bottom' | 'top';
  rootComponent: React.ComponentType<ArgumentAxis.RootProps>;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent: React.ComponentType<ArgumentAxis.LineProps>;
  tickFormat?: (scale: ScaleObject) => (tick: string) => string;
  tickSize?: number;
}

// @public
declare const ArgumentScale: React.ComponentType<ArgumentScaleProps>;

// @public (undocumented)
interface ArgumentScaleProps {
  factory?: () => ScaleObject;
  modifyDomain?: (domain: Array<any>) => Array<any>;
}

// @public (undocumented)
namespace BarSeries {
  interface PointProps {
    barWidth: number;
    color: string;
    index: number;
    maxBarWidth: number;
    value: number;
    x: number;
    y: number;
    y1: number;
  }
}

// @public
declare const BarSeries: React.ComponentType<BarSeriesProps>;

// @public (undocumented)
interface BarSeriesProps {
  argumentField: string;
  barWidth?: number;
  color?: string;
  name: string;
  pointComponent: React.ComponentType<BarSeries.PointProps>;
  scaleName?: string;
  valueField: string;
}

// @public (undocumented)
namespace Chart {
  interface RootProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
namespace Chart {
  interface LabelProps {
    children: string | number;
    x: number;
    y: number;
  }
}

// @public
declare const Chart: React.ComponentType<ChartProps>;

// @public (undocumented)
interface ChartProps {
  data: Array<any>;
  height?: number;
  rootComponent: React.ComponentType<Chart.RootProps>;
  width?: number;
}

// @public
declare const EventTracker: React.ComponentType<EventTrackerProps>;

// @public (undocumented)
interface EventTrackerProps {
  onClick?: (target: TargetData) => void;
  onPointerMove ?: (target: TargetData) => void;
}

// @public
declare const HoverState: React.ComponentType<HoverStateProps>;

// @public (undocumented)
interface HoverStateProps {
  defaultHover?: SeriesRef;
  hover?: SeriesRef;
  onHoverChange?: (target: SeriesRef) => void;
}

// @public (undocumented)
namespace Legend {
  interface LabelProps {
    text: string | number;
  }
}

// @public (undocumented)
namespace Legend {
  interface RootProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
namespace Legend {
  interface ItemProps {
    children: React.ReactNode;
  }
}

// @public
declare const Legend: React.ComponentType<LegendProps>;

// @public (undocumented)
interface LegendProps {
  itemComponent: React.ComponentType<Legend.ItemProps>;
  labelComponent: React.ComponentType<Legend.LabelProps>;
  markerComponent: React.ComponentType<object>;
  position?: 'left' | 'right' | 'top' | 'bottom';
  rootComponent: React.ComponentType<Legend.RootProps>;
}

// @public (undocumented)
namespace LineSeries {
  interface SeriesProps {
    color: string;
    coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number }>;
  }
}

// @public (undocumented)
namespace LineSeries {
  interface PathSeriesProps extends LineSeries.SeriesProps {
    path?: (coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number }>) => string;
  }
}

// @public
declare const LineSeries: React.ComponentType<LineSeriesProps>;

// @public (undocumented)
interface LineSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  scaleName?: string;
  seriesComponent: React.ComponentType<LineSeries.SeriesProps>;
  valueField: string;
}

// @public
declare const Palette: React.ComponentType<PaletteProps>;

// @public (undocumented)
interface PaletteProps {
  scheme: Array<string>;
}

// @public (undocumented)
namespace PieSeries {
  interface PointProps {
    color: string;
    endAngle: number;
    index: number;
    innerRadius: number;
    maxRadius: number;
    outerRadius: number;
    startAngle: number;
    value: number;
    x: number;
    y: number;
  }
}

// @public
declare const PieSeries: React.ComponentType<PieSeriesProps>;

// @public (undocumented)
interface PieSeriesProps {
  argumentField: string;
  innerRadius?: number;
  name: string;
  outerRadius?: number;
  pointComponent: React.ComponentType<PieSeries.PointProps>;
  valueField: string;
}

// @public (undocumented)
interface ScaleObject {
  bandWidth?: () => number;
  domain: (domain?: Array<any>) => ScaleObject | Array<any>;
  paddingInner?: (padding: number) => ScaleObject;
  paddingOuter?: (padding: number) => ScaleObject;
  range: () => (range?: Array<any>) => ScaleObject | Array<any>;
  tickFormat?: (count: number, specifier: string) => (tick: any) => string;
  ticks?: (count: number) => Array<any>;
}

// @public (undocumented)
namespace ScatterSeries {
  interface PointProps {
    color: string;
    index: number;
    point: { // (undocumented)
 size : number };
    value: number;
    x: number;
    y: number;
  }
}

// @public (undocumented)
namespace ScatterSeries {
  interface SeriesProps {
    coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number }>;
    point?: { // (undocumented)
 size : number };
    pointComponent: React.ComponentType<ScatterSeries.PointProps>;
  }
}

// @public
declare const ScatterSeries: React.ComponentType<ScatterSeriesProps>;

// @public (undocumented)
interface ScatterSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  point?: { // (undocumented)
 size : number };
  pointComponent: React.ComponentType<ScatterSeries.PointProps>;
  scaleName?: string;
  valueField: string;
}

// @public
declare const SelectionState: React.ComponentType<SelectionStateProps>;

// @public (undocumented)
interface SelectionStateProps {
  selection?: Array<SeriesRef>;
}

// @public
type SeriesData = Array<number>;

// @public
interface SeriesRef {
  point: number;
  series: string;
}

// @public (undocumented)
namespace SplineSeries {
  interface SeriesProps {
    color: string;
    coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number }>;
  }
}

// @public (undocumented)
namespace SplineSeries {
  interface PathSeriesProps extends SplineSeries.SeriesProps {
    path?: (coordinates: Array<{ // (undocumented)
 x: number, // (undocumented)
 y: number }>) => string;
  }
}

// @public
declare const SplineSeries: React.ComponentType<SplineSeriesProps>;

// @public (undocumented)
interface SplineSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  scaleName?: string;
  seriesComponent: React.ComponentType<SplineSeries.SeriesProps>;
  valueField: string;
}

// @public
declare const Stack: React.ComponentType<StackProps>;

// @public (undocumented)
interface StackData {
  series: Array<string>;
}

// @public (undocumented)
interface StackProps {
  offset?: (data: Array<SeriesData>, order: Array<number>) => void;
  order?: (data: Array<SeriesData>) => Array<number>;
  stacks?: Array<StackData>;
}

// @public
interface TargetData {
  event: object;
  location: Array<number>;
  targets: Array<SeriesRef>;
}

// @public (undocumented)
namespace Title {
  interface TextProps {
    text: string;
  }
}

// @public
declare const Title: React.ComponentType<TitleProps>;

// @public (undocumented)
interface TitleProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  text: string;
  textComponent: React.ComponentType<Title.TextProps>;
}

// @public (undocumented)
namespace Tooltip {
  interface OverlayProps {
    children: React.ReactNode;
    target: () => HTMLElement;
  }
}

// @public (undocumented)
namespace Tooltip {
  interface ContentProps {
    targetItem: SeriesRef;
    text: string;
  }
}

// @public
declare const Tooltip: React.ComponentType<TooltipProps>;

// @public (undocumented)
interface TooltipProps {
  contentComponent: React.ComponentType<Tooltip.ContentProps>;
  defaultTargetItem?: SeriesRef;
  onTargetItemChange?: (target: SeriesRef) => void;
  overlayComponent: React.ComponentType<Tooltip.OverlayProps>;
  targetItem?: SeriesRef;
}

// @public (undocumented)
namespace ValueAxis {
  interface RootProps {
    children: React.ReactNode;
    x: number;
    y: number;
  }
}

// @public (undocumented)
namespace ValueAxis {
  interface LineProps {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }
}

// @public (undocumented)
namespace ValueAxis {
  interface LabelProps {
    dominantBaseline: 'hanging' | 'middle' | 'baseline';
    text: string | number;
    textAnchor: 'start' | 'middle' | 'end';
    x: number;
    y: number;
  }
}

// @public
declare const ValueAxis: React.ComponentType<ValueAxisProps>;

// @public (undocumented)
interface ValueAxisProps {
  gridComponent: React.ComponentType<ValueAxis.LineProps>;
  indentFromAxis?: number;
  labelComponent: React.ComponentType<ValueAxis.LabelProps>;
  lineComponent: React.ComponentType<ValueAxis.LineProps>;
  position?: 'left' | 'right';
  rootComponent: React.ComponentType<ValueAxis.RootProps>;
  scaleName?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent: React.ComponentType<ValueAxis.LineProps>;
  tickFormat?: (scale: ScaleObject) => (tick: string) => string;
  tickSize?: number;
}

// @public
declare const ValueScale: React.ComponentType<ValueScaleProps>;

// @public (undocumented)
interface ValueScaleProps {
  factory?: () => ScaleObject;
  modifyDomain?: (domain: Array<any>) => Array<any>;
  name?: string;
}


// (No @packageDocumentation comment for this package)
