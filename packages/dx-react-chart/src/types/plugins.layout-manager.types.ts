import { ChartRootProps } from './chart.types';

/** @internal */
export interface LayoutManagerProps {
  height: number;
  rootComponent: React.ComponentType<ChartRootProps>;
  width?: number;
}
/** @internal */
export type LayoutManagerState = {bBoxes: {pane: {width: number, height: number}}};
