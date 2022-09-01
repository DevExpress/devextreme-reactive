import { DataItems } from './index';
export type ChartProps = React.PropsWithChildren<{
  /** An array containing custom data */
  data: DataItems;
  /** A component that renders the chart root layout */
  rootComponent: React.ComponentType<Chart.RootProps>;
  /** Chart height */
  height?: number;
  /** Chart width */
  width?: number;
  /** Chart rotation */
  rotated?: boolean;
}>;

// tslint:disable-next-line: no-namespace
export namespace Chart {
  export interface LabelProps {
    /** The label text */
    children: string | number;
    /** The x coordinate of the label’s top left corner */
    x: number;
    /** The y coordinate of the label’s top left corner */
    y: number;
  }
  export interface RootProps {
    /** A React node to be placed in the root layout */
    children: React.ReactNode;
    /** @internal */
    width: number;
    /** @internal */
    height: number;
  }
}
