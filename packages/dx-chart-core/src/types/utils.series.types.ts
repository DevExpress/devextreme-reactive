import { Area } from 'd3-shape';
import {
  TransformedPoint, Location,
} from './chart-core.types';
/** @internal */
export type MakePathFn = () => Area<TransformedPoint>;
/** @internal */
export type IsPointInPathFn = (target: Location) => boolean;
/** @internal */
export type HitTestPointFn =
  (location: Location, point: TransformedPoint) => Readonly<{ distance: number }> | null;
/** @internal */
export type Filter = {
  readonly [series: string]: ReadonlySet<number>;
};
