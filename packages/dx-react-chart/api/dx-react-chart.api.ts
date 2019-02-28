// @public (undocumented)
interface AnimationProps {
}

// @public (undocumented)
module AreaSeries {
  interface PathSeriesProps extends SeriesProps {
  }

  interface SeriesProps extends PathComponentPathProps {
  }

}

// @public (undocumented)
interface AreaSeriesProps extends SeriesProps {
  seriesComponent?: React.ComponentType<AreaSeries.SeriesProps>;
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
module BarSeries {
  interface PointProps extends PointComponentProps {
    barWidth: number;
    maxBarWidth: number;
  }

}

// @public (undocumented)
interface BarSeriesProps extends SeriesProps {
  barWidth?: number;
  pointComponent?: React.ComponentType<BarSeries.PointProps>;
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
interface CommonComponentProps {
  // (undocumented)
  color: string;
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
  interface PathSeriesProps extends SeriesProps {
  }

  interface SeriesProps extends PathComponentPathProps {
  }

}

// @public (undocumented)
interface LineSeriesProps extends SeriesProps {
  seriesComponent?: React.ComponentType<LineSeries.SeriesProps>;
}

// @public (undocumented)
interface PaletteProps {
  scheme: Colors;
}

// @public (undocumented)
interface PathComponentPathProps extends PathComponentProps {
  path?: PathFn;
}

// @public (undocumented)
interface PathComponentProps extends CommonComponentProps {
  coordinates: PathPoints;
}

// @public (undocumented)
interface PathFn {
  // (undocumented)
  (points: PathPoints): string;
  // (undocumented)
  context(ctx: any): this;
  // (undocumented)
  curve?(): any;
  // (undocumented)
  x(): GetPointFieldFn;
  // (undocumented)
  y(): GetPointFieldFn;
  // (undocumented)
  y0?(): GetPointFieldFn;
  // (undocumented)
  y1?(): GetPointFieldFn;
}

// @public (undocumented)
module PieSeries {
  interface PointProps extends PointComponentProps {
    endAngle: number;
    innerRadius: number;
    maxRadius: number;
    outerRadius: number;
    startAngle: number;
  }

}

// @public (undocumented)
interface PieSeriesProps extends SeriesProps {
  innerRadius?: number;
  outerRadius?: number;
  pointComponent?: React.ComponentType<PieSeries.PointProps>;
}

// @public (undocumented)
interface Point {
  readonly color: string;
  readonly index: number;
  readonly value: any;
}

// @public (undocumented)
interface PointComponentProps extends CommonComponentProps {
  argument: any;
  index: number;
  value: any;
  x: number;
  y: number;
  y1?: number;
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

// WARNING: Unsupported export: PointOptions
// @public (undocumented)
module ScatterSeries {
  interface PointProps extends PointComponentProps {
    point: PointOptions;
  }

  interface SeriesProps extends PathComponentProps {
  }

}

// @public (undocumented)
interface ScatterSeriesProps extends SeriesProps {
  point?: ScatterSeries.PointOptions;
  pointComponent?: React.ComponentType<ScatterSeries.PointProps>;
}

// @public (undocumented)
interface SelectionStateProps {
  selection?: TargetList;
}

// @public (undocumented)
interface SeriesProps {
  argumentField: string;
  color?: string;
  name?: string;
  scaleName?: string;
  valueField: string;
}

// @public
interface SeriesRef {
  readonly point: number;
  readonly series: string;
}

// @public (undocumented)
module SplineSeries {
  interface PathSeriesProps extends SeriesProps {
  }

  interface SeriesProps extends PathComponentPathProps {
  }

}

// @public (undocumented)
interface SplineSeriesProps extends SeriesProps {
  seriesComponent?: React.ComponentType<SplineSeries.SeriesProps>;
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
// WARNING: Unsupported export: Palette
// WARNING: Unsupported export: Animation
// WARNING: Unsupported export: EventTracker
// WARNING: Unsupported export: HoverState
// WARNING: Unsupported export: SelectionState
// WARNING: Unsupported export: HoverStateState
// WARNING: Unsupported export: GetPointerMoveHandlersFn
// WARNING: Unsupported export: DataItem
// WARNING: Unsupported export: DataItems
// WARNING: Unsupported export: DomainItems
// WARNING: Unsupported export: TargetList
// WARNING: Unsupported export: GetFormatFn
// WARNING: Unsupported export: Colors
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
// WARNING: Unsupported export: PathPoints
// WARNING: Unsupported export: GetPointFieldFn
// WARNING: Unsupported export: FactoryFn
// WARNING: Unsupported export: ModifyDomainFn
// WARNING: Unsupported export: TickFormatFn
// WARNING: Unsupported export: Scales
// WARNING: Unsupported export: GetAnimationStyleFn
// WARNING: Unsupported export: BuildAnimatedStyleGetterFn
// WARNING: Unsupported export: HandlerFn
// WARNING: Unsupported export: HandlerFnList
// WARNING: Unsupported export: NotifyPointerMoveFn
// (No @packagedocumentation comment for this package)
