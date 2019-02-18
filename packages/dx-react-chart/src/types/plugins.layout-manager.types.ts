import { Chart } from './chart.types';

/** @internal */
export interface LayoutManagerProps {
  height: number;
  rootComponent: React.ComponentType<Chart.RootProps>;
  width?: number;
}
/** @internal */
export type LayoutManagerState = {bBoxes: {pane: {width: number, height: number}}};
