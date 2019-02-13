import {
  Scales, BuildAnimatedStyleGetterFn, TransformedPoint,
} from '@devexpress/dx-chart-core';

type PathFn = (points: ReadonlyArray<TransformedPoint>) => string;

interface InternalCommonProps {
/** @internal */
  style?: any;
/** @internal */
  scales: Scales;
/** @internal */
  getAnimatedStyle: BuildAnimatedStyleGetterFn;
}

interface InternalPathProps extends InternalCommonProps {
  /** @internal */
  index: number;
  /** @internal */
  state?: string;
}

interface InternalPointProps extends InternalCommonProps {
/** @internal */
  argument: any;
/** @internal */
  seriesIndex: number;
/** @internal */
  state?: string;
}

export interface PathProps extends InternalPathProps {
  // A function used to calculate the series’ path
  path?: PathFn;
  // Coordinates of the series’ points
  coordinates: TransformedPoint[];
  // A series color
  color?: string;
  // A component that renders a series point
  pointComponent: React.ComponentType<RawPointProps>;
}

export interface RawBarProps extends InternalPointProps {
  // The bar’s value
  value: number;
  // The bar’s x coordinate (the bar’s center)
  x: number;
  // The bar’s width in relative units
  barWidth: number;
  // The maximum width that the bar can occupy, measured in pixels
  maxBarWidth: number;
  // The bar’s y coordinate
  y: number;
  // The bar’s y1 coordinate
  y1: number;
  // Point index.
  index: number;
  // A series color
  color?: string;
}

export interface RawSliceProps extends InternalPointProps {
  // The slice’s value
  value: number;
  // The slice’s x coordinate
  x: number;
  // The slice’s y coordinate
  y: number;
  // Point index.
  index: number;
  // The inner radius in relative units
  innerRadius: number;
  // The outer radius in relative units
  outerRadius: number;
  // The slice’s maximum radius in pixels
  maxRadius: number;
  // The slice’s start angle
  startAngle: number;
  // The slice’s end angle
  endAngle: number;
  // A series color
  color?: string;
}

export interface RawPointProps extends InternalPointProps {
  value: number;
  // The point’s x coordinate
  x: number;
  // The point’s y coordinate
  y: number;
  // Point index
  index: number;
  // Point options
  point: { size: number };
  // A series color
  color?: string;
}

/** @internal */
export interface PointCollectionProps extends RawPointProps {
  pointComponent: React.ComponentType<RawPointProps>;
  coordinates: TransformedPoint[];
  index: number;
  state?: string;
}
