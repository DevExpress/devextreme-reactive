import { Area } from 'd3-shape';
import {
  TransformedPoint, Location,
} from './chart-core.types';

export type MakePathFn = () => Area<TransformedPoint>;
export type IsPointInPathFn = (target: Location) => boolean;

export type HitTestPointFn =
  (location: Location, point: TransformedPoint) => Readonly<{ distance: number }> | null;

export type Filter = {
  readonly [series: string]: ReadonlySet<number>;
};
