import { PureComputed } from '@devexpress/dx-core';
import { Row } from '..';

/** @internal */
export type Interval = {
  start: number,
  end: number,
};
/** @internal */
export type VirtualRows = {
  start: number,
  rows: Row[],
};

/** @internal */
export type VirtualRowsWithCacheFn = PureComputed<
  [number, Row[], VirtualRows], VirtualRows
>;

/** @internal */
export type PlainRowsFn = PureComputed<[VirtualRows], Row[]>;

/** @internal */
export type LoadedRowsStartFn = PureComputed<[VirtualRows], number>;

/** @internal */
export type MergeRowsFn = PureComputed<
  [Interval, Interval, Row[], Row[], number, number], VirtualRows
>;

/** @internal */
export type CalculateRequestedRangeFn = PureComputed<[Interval, Interval, number, number]>;
