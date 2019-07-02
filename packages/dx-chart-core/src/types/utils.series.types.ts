import {
  TransformedPoint, Location,
} from './chart-core.types';
import {
  PathFn,
} from './plugins.series.types';

/** @internal */
export type MakePathFn = (rotated: boolean) => PathFn;
/** @internal */
export type IsPointInPathFn = (target: Location) => boolean;
/** @internal */
export type HitTestPointFn = (
    location: Location, point: TransformedPoint, rotated: boolean,
  ) => Readonly<{ distance: number }> | null;
/** @internal */
export type Filter = {
  readonly [series: string]: ReadonlySet<number>;
};
