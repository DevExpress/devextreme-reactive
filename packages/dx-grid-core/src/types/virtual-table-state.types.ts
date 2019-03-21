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
export type TrimRowsToIntervalFn = PureComputed<[VirtualRows, Interval]>;

export type VirtualRowsWithCacheFn = PureComputed<
  [number, Row[], VirtualRows], VirtualRows
>;
