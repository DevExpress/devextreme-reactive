import { PureComputed } from '@devexpress/dx-core';
import { emptyVirtualRows } from './helpers';
import { Interval, VirtualRows } from '../../types';

const empty: Interval = {
  start: Number.POSITIVE_INFINITY,
  end: Number.NEGATIVE_INFINITY,
};

const getRowsInterval: PureComputed<[VirtualRows], Interval> = r => (
  r === emptyVirtualRows
    ? empty
    : {
      start: r.skip,
      end: r.skip + r.rows.length,
    }
);

const getLength = (a: Interval) => a.end - a.start;

const intersect = (a: Interval, b: Interval) => {
  if (a.end < b.start || b.end < a.start) {
    return empty;
  }

  return {
    start: Math.max(a.start, b.start),
    end: Math.min(a.end, b.end),
  };
};

const difference = (a: Interval, b: Interval) => {
  if (empty === intervalUtil.intersect(a, b)) {
    return a;
  }

  if (b.end < a.end) {
    return {
      start: b.end,
      end: a.end,
    };
  }
  if (a.start < b.start) {
    return {
      start: a.start,
      end: b.start,
    };
  }
  return empty;
};

export const intervalUtil = {
  empty,

  getRowsInterval,
  getLength,

  intersect,
  difference,
};
