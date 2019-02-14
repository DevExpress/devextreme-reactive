import { TickFormatFn } from './index';
import { LabelProps, LineProps, RootProps } from './templates.axis.types';

export interface RawAxisProps {
  // The tick size
  tickSize ?: number;
  // The indent from the axis
  indentFromAxis?: number;
  // The scale name
  scaleName: string;
  // A component that renders the axis root layout
  rootComponent: React.ComponentType<RootProps>;
  // A component that renders a tick
  tickComponent: React.ComponentType<LineProps>;
  // A component that renders the axis label
  labelComponent: React.ComponentType<LabelProps>;
  // A component that renders the axis line
  lineComponent: React.ComponentType<LineProps>;
  // A component that renders the grid
  gridComponent: React.ComponentType<LineProps>;
  // The axis position
  position: string;
  // Specifies whether to render the grid
  showGrid: boolean;
  // Specifies whether to render ticks
  showTicks: boolean;
  // Specifies whether to render the axis’s line
  showLine: boolean;
  // Specifies whether to render the axis’s labels
  showLabels: boolean;
  // A function that returns a tick formatter function
  tickFormat: TickFormatFn;
}
