import { PureComputed } from '@devexpress/dx-core';
import { Row } from '..';

export type Interval = {
  start: number,
  end: number,
};
export type VirtualRows = {
  start: number,
  rows: Row[],
};

export type VirtualRowsWithCacheFn = PureComputed<
  [number, Row[], VirtualRows], VirtualRows
>;

export type PlainRowsFn = PureComputed<[VirtualRows], Row[]>;

export type LoadedRowsStartFn = PureComputed<[VirtualRows], number>;

export type MergeRowsFn = PureComputed<
  [Interval, Interval, Row[], Row[], number, number], VirtualRows
>;

export type CalculateRequestedRangeFn = PureComputed<[Interval, Interval, number, number]>;
