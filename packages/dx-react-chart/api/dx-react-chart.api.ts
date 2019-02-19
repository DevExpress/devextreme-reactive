// @public (undocumented)
interface AnimationProps {
}

// @public (undocumented)
module AreaSeries {
  interface PathSeriesProps {
    path: PathFn;
  }

  interface SeriesProps extends PathSeriesProps, InternalPathProps {
    color?: string;
    coordinates: TransformedPoint[];
  }

}

// @public (undocumented)
interface AreaSeriesProps extends Series {
  seriesComponent: React.ComponentType<AreaSeries.PathSeriesProps>;
}

// @public (undocumented)
module ArgumentAxis {
  // (undocumented)
  interface LabelProps extends Axis.LabelProps {
  }

  // (undocumented)
  interface LineProps extends Axis.LineProps {
  }

  // (undocumented)
  interface RootProps extends Axis.RootProps {
  }

}

// @public (undocumented)
interface ArgumentAxisProps extends RawAxisProps {
  position?: 'top' | 'bottom';
}

// @public (undocumented)
interface ArgumentScaleProps extends ScaleProps {
}

// @public (undocumented)
module Axis {
  // (undocumented)
  interface LabelProps {
    dominantBaseline: string;
    text: string | number;
    textAnchor: string;
    x: number;
    y: number;
  }

  // (undocumented)
  interface LineProps {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }

  // (undocumented)
  interface RootProps {
    children: React.ReactNode;
    dx: number;
    dy: number;
  }

}

// @public (undocumented)
interface BarPoint extends TransformedPoint {
  readonly barWidth: number;
  readonly maxBarWidth: number;
}

// @public (undocumented)
module BarSeries {
  interface PointProps extends InternalPointProps, BarPoint {
  }

}

// @public (undocumented)
interface BarSeriesProps extends Series {
  barWidth?: number;
  pointComponent: React.ComponentType<BarSeries.PointProps>;
}

// @public (undocumented)
interface BasicDataProps {
  // (undocumented)
  data: DataItems;
}

// @public (undocumented)
module Chart {
  // (undocumented)
  interface LabelProps {
    children: string | number;
    x: number;
    y: number;
  }

  // (undocumented)
  interface RootProps {
    children: React.ReactNode;
  }

}

// @public (undocumented)
interface ChartProps {
  data: DataItems;
  height?: number;
  rootComponent: React.ComponentType<Chart.RootProps>;
  width?: number;
}

// @public (undocumented)
interface EventTrackerProps {
  onClick?: HandlerFn;
  onPointerMove?: HandlerFn;
}

// @public (undocumented)
interface HoverStateProps {
  defaultHover?: SeriesRef;
  hover?: SeriesRef;
  onHoverChange?: NotifyPointerMoveFn;
}

// @public (undocumented)
interface InternalPathProps extends InternalPointProps {
}

// @public (undocumented)
interface InternalPointProps {
}

// @public (undocumented)
module Legend {
  interface ItemProps {
    children: React.ReactNode;
  }

  interface LabelProps {
    // (undocumented)
    text: string | number;
  }

  // (undocumented)
  interface MarkerProps {
  }

  interface RootProps {
    children: React.ReactNode;
  }

}

// @public (undocumented)
interface LegendProps {
  itemComponent: React.ComponentType<Legend.ItemProps>;
  labelComponent: React.ComponentType<Legend.LabelProps>;
  markerComponent: React.ComponentType<Legend.MarkerProps>;
  position?: 'left' | 'right' | 'top' | 'bottom';
  rootComponent: React.ComponentType<Legend.RootProps>;
}

// @public (undocumented)
module LineSeries {
  interface PathSeriesProps {
    path: PathFn;
  }

  interface SeriesProps extends PathSeriesProps, InternalPathProps {
    color?: string;
    coordinates: TransformedPoint[];
  }

}

// @public (undocumented)
interface PaletteProps {
  scheme: Palette;
}

// @public (undocumented)
interface PiePoint extends TransformedPoint {
  readonly endAngle: number;
  readonly innerRadius: number;
  readonly maxRadius: number;
  readonly outerRadius: number;
  readonly startAngle: number;
}

// @public (undocumented)
module PieSeries {
  interface PointProps extends InternalPointProps, PiePoint {
  }

}

// @public (undocumented)
interface PieSeriesProps extends Series {
  innerRadius?: number;
  outerRadius?: number;
  pointComponent: React.ComponentType<PieSeries.PointProps>;
}

// @public (undocumented)
interface Point {
  readonly color: string;
  readonly index: number;
  readonly value: any;
}

// @public (undocumented)
interface RawAxisProps {
  gridComponent: React.ComponentType<Axis.LineProps>;
  indentFromAxis?: number;
  labelComponent: React.ComponentType<Axis.LabelProps>;
  lineComponent: React.ComponentType<Axis.LineProps>;
  position?: 'left' | 'top' | 'right' | 'bottom';
  rootComponent: React.ComponentType<Axis.RootProps>;
  scaleName?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showLine?: boolean;
  showTicks?: boolean;
  tickComponent: React.ComponentType<Axis.LineProps>;
  tickFormat?: TickFormatFn;
  tickSize?: number;
}

// @public (undocumented)
interface ScaleObject {
  // (undocumented)
  (value: any): number;
  bandwidth?: () => number;
  clamp?: (clamp: boolean) => ScaleObject;
  copy: () => ScaleObject;
  domain: (domain?: DomainItems) => any;
  paddingInner?: (arg: number) => ScaleObject;
  paddingOuter?: (arg: number) => ScaleObject;
  range: (range?: DomainItems) => any;
  tickFormat?: (count?: number, format?: string) => GetFormatFn;
  ticks?: (ticks?: number) => DomainItems;
}

// @public (undocumented)
interface ScaleProps {
  factory?: FactoryFn;
  modifyDomain?: ModifyDomainFn;
  name?: string;
}

// @public (undocumented)
interface ScatterPoint extends TransformedPoint {
  readonly point: {
    size: number;
  }
}

// @public (undocumented)
module ScatterSeries {
  interface PointProps extends InternalPointProps, ScatterPoint {
  }

  interface SeriesProps {
    coordinates: TransformedPoint[];
    point?: {
      size: number;
    }
    pointComponent: React.ComponentType<ScatterSeries.PointProps>;
  }

}

// @public (undocumented)
interface ScatterSeriesProps extends Series {
  point: {
    size: number;
  }
  pointComponent: React.ComponentType<ScatterSeries.PointProps>;
}

// @public (undocumented)
interface SelectionStateProps {
  selection?: TargetList;
}

// @public (undocumented)
interface Series {
  readonly argumentField: string;
  readonly color: string;
  readonly name: string;
  readonly scaleName: string;
  readonly valueField: string;
}

// @public
interface SeriesRef {
  readonly point: number;
  readonly series: string;
}

// @public (undocumented)
module SplineSeries {
  interface PathSeriesProps {
    path: PathFn;
  }

  interface SeriesProps extends PathSeriesProps, InternalPathProps {
    color?: string;
    coordinates: TransformedPoint[];
  }

}

// @public (undocumented)
interface Stack {
  readonly series: string[];
}

// @public (undocumented)
interface StackProps {
  offset?: OffsetFn;
  order?: OrderFn;
  stacks?: StackList;
}

// @public
interface TargetData {
  readonly event?: any;
  readonly location: Location;
  readonly targets: TargetList;
}

// @public (undocumented)
module Title {
  interface TextProps {
    text: string;
  }

}

// @public (undocumented)
interface TitleProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  text: string;
  textComponent: React.ComponentType<Title.TextProps>;
}

// @public (undocumented)
module Tooltip {
  interface ContentProps {
    targetItem: SeriesRef;
    text: string;
  }

  interface OverlayProps {
    children: React.ReactNode;
    target: TooltipReference;
  }

}

// @public (undocumented)
interface TooltipProps {
  contentComponent: React.ComponentType<Tooltip.ContentProps>;
  defaultTargetItem?: SeriesRef;
  onTargetItemChange?: NotifyPointerMoveFn;
  overlayComponent: React.ComponentType<Tooltip.OverlayProps>;
  targetItem?: SeriesRef;
}

// @public (undocumented)
interface TooltipReference {
  // (undocumented)
  readonly clientHeight: number;
  // (undocumented)
  readonly clientWidth: number;
  // (undocumented)
  getBoundingClientRect(): ClientRect;
}

// @public (undocumented)
interface TransformedPoint extends Point {
  readonly x: number;
  readonly y: number;
  readonly y1?: number;
}

// @public (undocumented)
module ValueAxis {
  // (undocumented)
  interface LabelProps extends Axis.LabelProps {
  }

  // (undocumented)
  interface LineProps extends Axis.LineProps {
  }

  // (undocumented)
  interface RootProps extends Axis.RootProps {
  }

}

// @public (undocumented)
interface ValueAxisProps extends RawAxisProps {
  position?: 'left' | 'right';
}

// @public (undocumented)
interface ValueScaleProps extends ScaleProps {
}

// WARNING: Unsupported export: ArgumentScale
// WARNING: Unsupported export: ValueScale
// WARNING: Unsupported export: PathFn
// WARNING: Unsupported export: DataItem
// WARNING: Unsupported export: DataItems
// WARNING: Unsupported export: DomainItems
// WARNING: Unsupported export: TargetList
// WARNING: Unsupported export: GetFormatFn
// WARNING: Unsupported export: Palette
// WARNING: Unsupported export: PointDistance
// WARNING: Unsupported export: NumberArray
// WARNING: Unsupported export: Location
// WARNING: Unsupported export: HitTestResult
// WARNING: Unsupported export: HitTestFn
// WARNING: Unsupported export: StackData
// WARNING: Unsupported export: OrderFn
// WARNING: Unsupported export: OffsetFn
// WARNING: Unsupported export: StackList
// WARNING: Unsupported export: StacksOptions
// WARNING: Unsupported export: FactoryFn
// WARNING: Unsupported export: ModifyDomainFn
// WARNING: Unsupported export: TickFormatFn
// WARNING: Unsupported export: Scales
// WARNING: Unsupported export: GetAnimationStyleFn
// WARNING: Unsupported export: BuildAnimatedStyleGetterFn
// WARNING: Unsupported export: HandlerFn
// WARNING: Unsupported export: NotifyPointerMoveFn
// (No @packagedocumentation comment for this package)
