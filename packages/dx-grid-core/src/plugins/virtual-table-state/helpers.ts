import { intervalUtil } from './utils';
import { Row } from '../../types';

export type VirtualRows = {
  start: number,
  rows: Row[],
};

export const mergeRows = (rowsInterval, cacheInterval, rows, cacheRows, rowsStart, cacheStart) => {
  const breakpoints = [
    rowsInterval.start,
    rowsInterval.end,
    cacheInterval.start,
    cacheInterval.end,
  ]
    .filter(i => 0 <= i && i < Number.POSITIVE_INFINITY)
    .sort((a, b) => a - b);

  console.log('bp', breakpoints)
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

export const calculateRequestedRange = (loadedInterval, newRange, middleIndex, pageSize) => {
  if (Math.abs(loadedInterval.start - newRange.start) > 2 * pageSize) {
    const useFirstHalf = middleIndex % pageSize < 50;
    const start = useFirstHalf ? newRange.start : newRange.start + pageSize;
    return { start, end: start + 2 * pageSize };
  }
  if (loadedInterval.start <= newRange.start && newRange.start <= loadedInterval.end) {
    return {
      start: loadedInterval.end,
      end: newRange.end,
    };
  }
  if (newRange.start <= loadedInterval.start && loadedInterval.start <= newRange.end) {
    return {
      start: newRange.start,
      end: loadedInterval.start,
    };
  }
  return intervalUtil.empty;
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

export const recalculateCache = (cache, rows, start, currentInterval) => {
  const cacheInterval = {
    start: cache.start,
    end: cache.start + cache.rows.length,
  };
  const rowsInterval = {
    start,
    end: start + rows.length,
  };

  const clippedCacheInterval = intervalUtil.intersect(cacheInterval, currentInterval);
  const clippedRowsInterval = intervalUtil.intersect(rowsInterval, currentInterval);

  return mergeRows(
    clippedRowsInterval, clippedCacheInterval, rows, cache.rows, start, cache.start,
  );
};
