import {
  SeriesRef,
} from './chart-core.types';
/** @internal */
export type ProcessedTarget = SeriesRef | null | undefined;
export type NotifyPointerMoveFn = (target: SeriesRef | null) => void;
