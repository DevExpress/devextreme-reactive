import { Chart, BBoxes } from '../types';

/** @internal */
export interface LayoutManagerProps {
  width?: number;
  height: number;
  rootComponent: React.ComponentType<Chart.RootProps>;
}
/** @internal */
export type LayoutManagerState = {
  bBoxes: BBoxes;
};
