import { PureComputed } from '@devexpress/dx-core';
import { Row } from '..';

/** @internal */
export type Interval = {
  start: number,
  end: number,
};
/** @internal */
export type VirtualRows = {
  skip: number,
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
export type CalculateRequestedRangeFn = PureComputed<[VirtualRows, Interval, number], Interval>;
/** @internal */
export type GetRequestMeta = PureComputed<
  [number, VirtualRows, number, number, boolean],
  { requestedRange: Interval, actualBounds: Interval }
>;
