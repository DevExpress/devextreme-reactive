import { intervalUtil } from './utils';
import {
  VirtualRows, Row, MergeRowsFn, CalculateRequestedRangeFn, Interval,
} from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export const emptyVirtualRows: VirtualRows = {
  start: Number.POSITIVE_INFINITY,
  rows: [],
};

export const mergeRows: MergeRowsFn = (
  rowsInterval, cacheInterval, rows, cacheRows, rowsStart, cacheStart,
) => {
  const breakpoints = [
    rowsInterval.start, rowsInterval.end,
    cacheInterval.start, cacheInterval.end,
  ]
    .filter(i => 0 <= i && i < Number.POSITIVE_INFINITY)
    .sort((a, b) => a - b);

  const pluckSubarray: PureComputed<[Row[], ...number[]]> = (source, sourceStart, left, right) => (
    source.slice(left - sourceStart, right - sourceStart)
  );

  let result: Row[] = [];
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

export const calculateRequestedRange: CalculateRequestedRangeFn = (
  loadedInterval, newRange, referenceIndex, pageSize,
) => {
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

export const rowToPageIndex: PureComputed<[number, number]> = (
  rowIndex, pageSize,
) => Math.floor(rowIndex / pageSize);

export const recalculateBounds: PureComputed<[number, number, number], Interval> = (
  middleIndex, pageSize, totalCount,
) => {
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

export const trimRowsToInterval: PureComputed<[VirtualRows, Interval]> = (
  virtualRows, targetInterval,
) => {
  const rowsInterval = intervalUtil.getRowsInterval(virtualRows);
  const intersection = intervalUtil.intersect(rowsInterval, targetInterval);
  if (intervalUtil.empty === intersection) {
    return emptyVirtualRows;
  }

  const relativeStart = intersection.start - virtualRows.start;
  const relativeEnd = intersection.end - virtualRows.start;
  const rows = virtualRows.rows.slice(relativeStart, relativeEnd);

  return {
    rows,
    start: intersection.start,
  };
};

export const getAvailableRowCount: PureComputed<[boolean, number, number, number], number> = (
  infiniteScroll, newCount, lastCount, totalRowCount,
) => (
  infiniteScroll
    ? Math.max(newCount, lastCount)
    : totalRowCount
);
