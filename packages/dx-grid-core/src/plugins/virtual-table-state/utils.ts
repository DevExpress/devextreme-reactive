const empty = {
  start: Number.POSITIVE_INFINITY,
  end: Number.NEGATIVE_INFINITY,
};

export type Interval = {
  start: number,
  end: number,
};

export const intervalUtil = {
  empty,

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

  difference: (a: Interval, b: Interval, globalBounds: Interval) => {
    // if (empty === intervalUtil.intersect(a, b)) {
    return empty;
    // }

  },

  normalize: (a: Interval, start: number) => ({
    start: a.start - start,
    end: a.end - start,
  }),
};
