import { VirtualRows, emptyVirtualRows } from './helpers';
import { PureComputed } from '@devexpress/dx-core';

const empty = {
  start: Number.POSITIVE_INFINITY,
  end: Number.NEGATIVE_INFINITY,
};

export type Interval = {
  start: number,
  end: number,
};

const getRowsInterval: PureComputed<[VirtualRows], Interval> = r => (
  r === emptyVirtualRows
    ? empty
    : {
      start: r.start,
      end: r.start + r.rows.length,
    }
);

export const intervalUtil = {
  empty,

  getRowsInterval,

  getLength: (a: Interval) => a.end - a.start,

  intersect: (a: Interval, b: Interval) => {
    if (a.end < b.start || b.end < a.start) {
      return empty;
    }

    return {
      start: Math.max(a.start, b.start),
      end: Math.min(a.end, b.end),
    };
  },

  difference: (a: Interval, b: Interval) => {
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
  },

  normalize: (a: Interval, start: number) => ({
    start: a.start - start,
    end: a.end - start,
  }),
};
