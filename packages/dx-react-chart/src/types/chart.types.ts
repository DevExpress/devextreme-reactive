import { DataItems } from '@devexpress/dx-chart-core';
export interface RawChartProps {
  // An array containing custom data
  data: DataItems;
  // A component that renders the chart root layout
  rootComponent: React.ComponentType<ChartRootProps>;
  // Chart height
  height?: number;
  // Chart width
  width?: number;
  /** @internal */
  children?: any;
}

export interface ChartRootProps {
  // A React node to be placed in the root layout
  children: React.ReactNode;
}
