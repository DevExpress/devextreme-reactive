// @public (undocumented)
declare const Animation: React.ComponentType<AnimationProps>;

// @public (undocumented)
interface AnimationProps {
}

// @public (undocumented)
declare const AreaSeries: React.ComponentType<AreaSeriesProps>;

// @public (undocumented)
declare namespace AreaSeries {
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
declare const ArgumentAxis: React.ComponentType<ArgumentAxisProps>;

// @public (undocumented)
namespace ArgumentAxis {
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
declare const ArgumentScale: React.ComponentType<ArgumentScaleProps>;

// @public (undocumented)
interface ArgumentScaleProps extends ScaleProps {
}

// @public (undocumented)
namespace Axis {
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
declare const BarSeries: React.ComponentType<BarSeriesProps>;

// @public (undocumented)
declare namespace BarSeries {
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
declare type BoundsFn = (scale: ScaleObject, bounds: NumberArray, delta: number, name: string, type: string) => any[];

// @public (undocumented)
declare type BuildAnimatedStyleGetterFn = PureComputed<[any, GetAnimationStyleFn, Scales, PointComponentProps?]>;

// @public (undocumented)
declare const Chart: React.ComponentType<ChartProps>;

// @public (undocumented)
namespace Chart {
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
declare const checkDragToZoom: (dragToZoom: boolean, panKey: string, event: MouseEvent) => any;

// @public (undocumented)
declare type Colors = ReadonlyArray<string>;

// @public (undocumented)
interface CommonComponentProps {
  color: string;
}

// @public (undocumented)
declare type Coordinates = {
  // (undocumented)
  readonly x: number;
  // (undocumented)
  readonly y: number;
};

// @public (undocumented)
declare type DataItem = {
  // (undocumented)
  readonly [field: string]: any;
};

// @public (undocumented)
declare type DataItems = ReadonlyArray<DataItem>;

// @public (undocumented)
declare type DomainBounds = Readonly<any[]>;

// @public (undocumented)
declare type DomainItems = ReadonlyArray<any>;

// @public (undocumented)
declare const EventTracker: React.ComponentType<EventTrackerProps>;

// @public (undocumented)
interface EventTrackerProps {
  onClick?: HandlerFn;
  onPointerMove?: HandlerFn;
}

// @public (undocumented)
declare type FactoryFn = () => ScaleObject;

// @public (undocumented)
declare type GetAnimationStyleFn = (scales: Scales, point?: PointComponentProps) => {
  // (undocumented)
  readonly animation: string;
  // (undocumented)
  readonly transformOrigin?: string;
};

// @public (undocumented)
declare const getBounds: BoundsFn;

// @public (undocumented)
declare const getDeltaForTouches: (touches: Touch[]) => number;

// @public (undocumented)
declare type GetFormatFn = (tick: any) => string;

// @public (undocumented)
type GetPointerMoveHandlersFn = PureComputed<[Getters], HandlerFnList>;

// @public (undocumented)
declare type GetPointFieldFn = (point: PointComponentProps) => number;

// @public (undocumented)
declare const getValueScaleName: (viewport?: ViewportOptions | undefined) => string;

// @public (undocumented)
declare type HandlerFn = (arg: TargetData) => void;

// @public (undocumented)
declare type HandlerFnList = ReadonlyArray<HandlerFn>;

// @public (undocumented)
declare type HitTestFn = (location: Location) => HitTestResult;

// @public (undocumented)
declare type HitTestResult = {
  // (undocumented)
  readonly points: ReadonlyArray<PointDistance>;
} | null;

// @public (undocumented)
declare const HoverState: React.ComponentType<HoverStateProps>;

// @public (undocumented)
interface HoverStateProps {
  defaultHover?: SeriesRef;
  hover?: SeriesRef;
  onHoverChange?: NotifyPointerMoveFn;
}

// @public (undocumented)
type HoverStateState = {
  // (undocumented)
  hover?: SeriesRef;
};

// @public (undocumented)
type LastCoordinates = {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
} | null;

// @public (undocumented)
declare const Legend: React.ComponentType<LegendProps>;

// @public (undocumented)
namespace Legend {
  interface ItemProps {
    children: React.ReactNode;
  }
  interface LabelProps {
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
declare const LineSeries: React.ComponentType<AreaSeriesProps>;

// @public (undocumented)
declare namespace LineSeries {
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
declare type Location = Readonly<NumberArray>;

// @public (undocumented)
declare type ModifyDomainFn = (domain: DomainItems) => DomainItems;

// @public (undocumented)
declare type NotifyPointerMoveFn = (target: SeriesRef | null) => void;

// @public (undocumented)
declare type NumberArray = [number, number];

// @public (undocumented)
declare const offsetCoordinates: (coordinates: Coordinates, offset: [number, number]) => {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
};

// @public (undocumented)
declare type OffsetFn = (series: StackData, order: number[]) => void;

// @public (undocumented)
declare type OrderFn = (series: StackData) => number[];

// @public (undocumented)
declare const Palette: React.ComponentType<PaletteProps>;

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
  curve?(c: any): this;
  // (undocumented)
  x(f: GetPointFieldFn): this;
  // (undocumented)
  x(): GetPointFieldFn;
  // (undocumented)
  y(): GetPointFieldFn;
  // (undocumented)
  y(f: GetPointFieldFn): this;
  // (undocumented)
  y0?(): GetPointFieldFn;
  // (undocumented)
  y0?(f: GetPointFieldFn): this;
  // (undocumented)
  y1?(): GetPointFieldFn;
  // (undocumented)
  y1?(f: GetPointFieldFn): this;
}

// @public (undocumented)
declare type PathPoints = ReadonlyArray<PointComponentProps>;

// @public (undocumented)
declare const PieSeries: React.ComponentType<PieSeriesProps>;

// @public (undocumented)
declare namespace PieSeries {
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
declare type PointDistance = {
  // (undocumented)
  readonly index: number;
  // (undocumented)
  readonly distance: number;
};

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
type RectBox = {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
  // (undocumented)
  width: number;
  // (undocumented)
  height: number;
};

// @public (undocumented)
interface ScaleObject {
  // (undocumented)
  (value: any): number;
  bandwidth?(): number;
  clamp?(clamp: boolean): this;
  copy(): this;
  domain(domain: DomainItems): this;
  domain(): DomainItems;
  invert(value: number): any;
  paddingInner?(arg: number): this;
  paddingOuter?(arg: number): this;
  range(): NumberArray;
  range(range: NumberArray): this;
  tickFormat?(count?: number, format?: string): GetFormatFn;
  ticks?(ticks?: number): DomainItems;
}

// @public (undocumented)
interface ScaleProps {
  factory?: FactoryFn;
  modifyDomain?: ModifyDomainFn;
  name?: string;
}

// @public (undocumented)
declare type Scales = {
  // (undocumented)
  readonly xScale: ScaleObject;
  // (undocumented)
  readonly yScale: ScaleObject;
};

// @public (undocumented)
declare type ScalesCache = {
  // (undocumented)
  readonly [key: string]: ScaleObject;
};

// @public (undocumented)
declare const ScatterSeries: React.ComponentType<ScatterSeriesProps>;

// @public (undocumented)
declare namespace ScatterSeries {
  type PointOptions = {
    // (undocumented)
    size: number;
  };
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
declare const SelectionState: React.ComponentType<SelectionStateProps>;

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
declare const SplineSeries: React.ReactType<AreaSeriesProps>;

// @public (undocumented)
declare namespace SplineSeries {
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
declare const Stack: React.ComponentType<StackProps>;

// @public (undocumented)
interface Stack {
  readonly series: string[];
}

// @public (undocumented)
declare type StackData = ReadonlyArray<ReadonlyArray<number>>;

// @public (undocumented)
declare type StackList = ReadonlyArray<Stack>;

// @public (undocumented)
interface StackProps {
  offset?: OffsetFn;
  order?: OrderFn;
  stacks?: StackList;
}

// @public (undocumented)
declare type StacksOptions = {
  // (undocumented)
  stacks: StackList;
  // (undocumented)
  offset: OffsetFn;
  // (undocumented)
  order: OrderFn;
};

// @public
interface TargetData {
  readonly event?: any;
  readonly location: Location;
  readonly targets: TargetList;
}

// @public (undocumented)
declare type TargetList = ReadonlyArray<SeriesRef>;

// @public (undocumented)
declare type TickFormatFn = (scale: ScaleObject) => GetFormatFn;

// @public (undocumented)
declare const Title: React.ComponentType<TitleProps>;

// @public (undocumented)
namespace Title {
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
declare const Tooltip: React.ComponentType<TooltipProps>;

// @public (undocumented)
namespace Tooltip {
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
declare const ValueAxis: React.ComponentType<ValueAxisProps>;

// @public (undocumented)
namespace ValueAxis {
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
declare const ValueScale: React.ComponentType<ValueScaleProps>;

// @public (undocumented)
interface ValueScaleProps extends ScaleProps {
}

// @public (undocumented)
declare type ViewportOptions = {
  // (undocumented)
  readonly argumentStart?: any;
  // (undocumented)
  readonly argumentEnd?: any;
  // (undocumented)
  readonly scaleName?: string;
  // (undocumented)
  readonly valueStart?: any;
  // (undocumented)
  readonly valueEnd?: any;
};

// @public (undocumented)
declare const ZoomAndPan: React.ComponentType<ZoomAndPanProps>;

// @public (undocumented)
namespace ZoomAndPan {
  // (undocumented)
  interface DragBoxProps {
    // (undocumented)
    color: string;
    // (undocumented)
    opacity: number;
    // (undocumented)
    rectBox: RectBox;
  }
}

// @public (undocumented)
interface ZoomAndPanProps {
  defaultViewport?: ViewportOptions;
  dragBoxComponent: React.ComponentType<ZoomAndPan.DragBoxProps>;
  dragToZoom?: boolean;
  interactionWithArguments?: 'none' | 'pan' | 'zoom' | 'both';
  interactionWithValues?: 'none' | 'pan' | 'zoom' | 'both';
  onViewportChange?: (viewport: ViewportOptions) => void;
  panKey?: 'shift' | 'alt' | 'ctrl';
  viewport?: ViewportOptions;
}

// @public (undocumented)
type ZoomAndPanState = {
  // (undocumented)
  viewport?: ViewportOptions;
  // (undocumented)
  rectBox?: RectBox;
};


// (No @packageDocumentation comment for this package)

