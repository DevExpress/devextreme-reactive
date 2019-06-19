import {
  TransformedPoint, Location,
} from './chart-core.types';
import {
  Path,
} from './plugins.series.types';

/** @internal */
export type MakePathFn = () => Path;
/** @internal */
export type IsPointInPathFn = (target: Location) => boolean;
/** @internal */
export type HitTestPointFn =
  (location: Location, point: TransformedPoint) => Readonly<{ distance: number }> | null;
/** @internal */
export type Filter = {
  readonly [series: string]: ReadonlySet<number>;
};
