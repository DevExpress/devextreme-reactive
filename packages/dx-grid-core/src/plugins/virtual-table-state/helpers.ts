import { intervalUtil, Interval } from './utils';
import { Row } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export type VirtualRows = {
  start?: number,
  rows: Row[],
};

export const mergeRows = (rowsInterval, cacheInterval, rows, cacheRows, rowsStart, cacheStart) => {
  const breakpoints = [
    rowsInterval.start, rowsInterval.end,
    cacheInterval.start, cacheInterval.end,
  ]
    .filter(i => 0 <= i && i < Number.POSITIVE_INFINITY)
    .sort((a, b) => a - b);

  let result = [];

  const pluckSubarray = (source, sourceStart, left, right) => (
    source.slice(left - sourceStart, right - sourceStart)
  );

  if (breakpoints.length > 1) {
    for (let i = 0; i < breakpoints.length - 1; i += 1) {
      const left = breakpoints[i];
      const right = breakpoints[i + 1];
      const chunk = rowsInterval.start <= left && right <= rowsInterval.end
        ? pluckSubarray(rows, rowsStart, left, right)
        : pluckSubarray(cacheRows, cacheStart, left, right);

      result = result.concat(chunk);
    }
  }

  return {
    start: breakpoints[0],
    rows: result,
  };
};

export const calculateRequestedRange = (loadedInterval, newRange, referenceIndex, pageSize) => {
  if (Math.abs(loadedInterval.start - newRange.start) >= 2 * pageSize) {
    const useFirstHalf = referenceIndex % pageSize < 50;
    const start = useFirstHalf
      ? newRange.start
      : newRange.start + pageSize;
    const end = Math.min(newRange.end, start + 2 * pageSize);

    return { start, end };
  }
  return intervalUtil.difference(newRange, loadedInterval);
};

export const rowToPageIndex = (rowIndex, pageSize) => Math.floor(rowIndex / pageSize);
export const recalculateBounds = (middleIndex, pageSize, totalCount) => {
  const currentPageIndex = rowToPageIndex(middleIndex, pageSize);

  const prevPageIndex = currentPageIndex - 1;
  const nextPageIndex = currentPageIndex + 2;
  const start = Math.max(0, prevPageIndex * pageSize);
  const end = Math.min(nextPageIndex * pageSize, totalCount);

  return {
    start,
    end,
  };
};

type TrimRowsToIntervalFn = PureComputed<[VirtualRows, Interval]>;
export const trimRowsToInterval: TrimRowsToIntervalFn = (virtualRows, targetInterval) => {
  const rowsInterval = intervalUtil.getRowsInterval(virtualRows);
  const intersection = intervalUtil.intersect(rowsInterval, targetInterval);
  if (intervalUtil.empty === intersection) {
    return { start: undefined, rows: [] };
  }

  const relativeStart = intersection.start - virtualRows.start;
  const relativeEnd = intersection.end - virtualRows.start;
  const rows = virtualRows.rows.slice(relativeStart, relativeEnd);

  return {
    rows,
    start: intersection.start,
  };
};
