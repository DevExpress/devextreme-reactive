// @public (undocumented)
interface AnimationProps {
}

// @public (undocumented)
module AreaSeries {
  interface PathSeriesProps extends AreaSeries.SeriesProps {
    path?: (coordinates: Array<{ x: number, y: number, y1: number }>) => string;
  }

  interface SeriesProps {
    color: string;
    coordinates: Array<{ x: number, y: number, y1: number }>;
  }

}

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
module ArgumentAxis {
  interface LabelProps {
    dominantBaseline: 'hanging' | 'middle' | 'baseline';
    text: string | number;
    textAnchor: 'start' | 'middle' | 'end';
    x: number;
    y: number;
  }

  interface LineProps {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }

  interface RootProps {
    children: React.ReactNode;
    x: number;
    y: number;
  }

}

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

// @public (undocumented)
interface ArgumentScaleProps {
  factory?: () => ScaleObject;
  modifyDomain?: (domain: Array<any>) => Array<any>;
}

// @public (undocumented)
module BarSeries {
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
module Chart {
  interface LabelProps {
    children: string | number;
    x: number;
    y: number;
  }

  interface RootProps {
    children: React.ReactNode;
  }

}

// @public (undocumented)
interface ChartProps {
  data: Array<any>;
  height?: number;
  rootComponent: React.ComponentType<Chart.RootProps>;
  width?: number;
}

// @public (undocumented)
interface EventTrackerProps {
  onClick?: (target: TargetData) => void;
  onPointerMove?: (target: TargetData) => void;
}

// @public (undocumented)
interface HoverStateProps {
  defaultHover?: SeriesRef;
  hover?: SeriesRef;
  onHoverChange?: (target: SeriesRef) => void;
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

  interface RootProps {
    children: React.ReactNode;
  }

}

// @public (undocumented)
interface LegendProps {
  itemComponent: React.ComponentType<Legend.ItemProps>;
  labelComponent: React.ComponentType<Legend.LabelProps>;
  markerComponent: React.ComponentType<object>;
  position?: 'left' | 'right' | 'top' | 'bottom';
  rootComponent: React.ComponentType<Legend.RootProps>;
}

// @public (undocumented)
module LineSeries {
  interface PathSeriesProps extends LineSeries.SeriesProps {
    path?: (coordinates: Array<{ x: number, y: number }>) => string;
  }

  interface SeriesProps {
    color: string;
    coordinates: Array<{ x: number, y: number }>;
  }

}

// @public (undocumented)
interface LineSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  scaleName?: string;
  seriesComponent: React.ComponentType<LineSeries.SeriesProps>;
  valueField: string;
}

// @public (undocumented)
interface PaletteProps {
  scheme: Array<string>;
}

// @public (undocumented)
module PieSeries {
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
module ScatterSeries {
  interface PointProps {
    color: string;
    index: number;
    point: {
      size: number;
    }
    value: number;
    x: number;
    y: number;
  }

  interface SeriesProps {
    coordinates: Array<{ x: number, y: number }>;
    point?: {
      size: number;
    }
    pointComponent: React.ComponentType<ScatterSeries.PointProps>;
  }

}

// @public (undocumented)
interface ScatterSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  point?: {
    size: number;
  }
  pointComponent: React.ComponentType<ScatterSeries.PointProps>;
  scaleName?: string;
  valueField: string;
}

// @public (undocumented)
interface SelectionStateProps {
  selection?: Array<SeriesRef>;
}

// @public
interface SeriesRef {
  point: number;
  series: string;
}

// @public (undocumented)
module SplineSeries {
  interface PathSeriesProps extends SplineSeries.SeriesProps {
    path?: (coordinates: Array<{ x: number, y: number }>) => string;
  }

  interface SeriesProps {
    color: string;
    coordinates: Array<{ x: number, y: number }>;
  }

}

// @public (undocumented)
interface SplineSeriesProps {
  argumentField: string;
  color?: string;
  name: string;
  scaleName?: string;
  seriesComponent: React.ComponentType<SplineSeries.SeriesProps>;
  valueField: string;
}

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
    target: () => HTMLElement;
  }

}

// @public (undocumented)
interface TooltipProps {
  contentComponent: React.ComponentType<Tooltip.ContentProps>;
  defaultTargetItem?: SeriesRef;
  onTargetItemChange?: (target: SeriesRef) => void;
  overlayComponent: React.ComponentType<Tooltip.OverlayProps>;
  targetItem?: SeriesRef;
}

// @public (undocumented)
module ValueAxis {
  interface LabelProps {
    dominantBaseline: 'hanging' | 'middle' | 'baseline';
    text: string | number;
    textAnchor: 'start' | 'middle' | 'end';
    x: number;
    y: number;
  }

  interface LineProps {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }

  interface RootProps {
    children: React.ReactNode;
    x: number;
    y: number;
  }

}

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

// @public (undocumented)
interface ValueScaleProps {
  factory?: () => ScaleObject;
  modifyDomain?: (domain: Array<any>) => Array<any>;
  name?: string;
}

// WARNING: Unsupported export: Animation
// WARNING: Unsupported export: ArgumentScale
// WARNING: Unsupported export: EventTracker
// WARNING: Unsupported export: HoverState
// WARNING: Unsupported export: Palette
// WARNING: Unsupported export: SelectionState
// WARNING: Unsupported export: SeriesData
// WARNING: Unsupported export: Stack
// WARNING: Unsupported export: ValueScale
// (No @packagedocumentation comment for this package)
