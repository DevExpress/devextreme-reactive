import { TickFormatFn } from './index';
import { Axis } from './templates.axis.types';

export interface RawAxisProps {
  /** The tick size */
  tickSize ?: number;
  /** The indent from the axis */
  indentFromAxis?: number;
  /** The scale name */
  scaleName?: string;
  /** A component that renders the axis root layout */
  rootComponent: React.ComponentType<Axis.RootProps>;
  /** A component that renders a tick */
  tickComponent: React.ComponentType<Axis.LineProps>;
  /** A component that renders the axis label */
  labelComponent: React.ComponentType<Axis.LabelProps>;
  /** A component that renders the axis line */
  lineComponent: React.ComponentType<Axis.LineProps>;
  /** A component that renders the grid */
  gridComponent: React.ComponentType<Axis.LineProps>;
  /** The axis position */
  position?: 'left' | 'top' | 'right' | 'bottom';
  /** Specifies whether to render the grid */
  showGrid?: boolean;
  /** Specifies whether to render ticks */
  showTicks?: boolean;
  /** Specifies whether to render the axis’s line */
  showLine?: boolean;
  /** Specifies whether to render the axis’s labels */
  showLabels?: boolean;
  /** A function that returns a tick formatter function */
  tickFormat?: TickFormatFn;
}
