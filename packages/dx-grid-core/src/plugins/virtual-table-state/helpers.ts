import { intervalUtil } from './utils';
import {
  VirtualRows, Row, MergeRowsFn, CalculateRequestedRangeFn, Interval,
} from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export const emptyVirtualRows: VirtualRows = {
  skip: Number.POSITIVE_INFINITY,
  rows: [],
};

const pluckSubarray: PureComputed<[Row[], ...number[]]> = (source, sourceStart, left, right) => (
  source.slice(left - sourceStart, right - sourceStart)
);

export const mergeRows: MergeRowsFn = (
  rowsInterval, cacheInterval, rows, cacheRows, rowsStart, cacheStart,
) => {
  const breakpoints = [
    rowsInterval.start, rowsInterval.end,
    cacheInterval.start, cacheInterval.end,
  ]
    .filter(i => 0 <= i && i < Number.POSITIVE_INFINITY)
    .sort((a, b) => a - b);

  let result: Row[] = [];
  if (breakpoints.length > 1) {
    for (let i = 0; i < breakpoints.length - 1; i += 1) {
      const left = breakpoints[i];
      const right = breakpoints[i + 1];
      const chunk = rowsInterval.start <= left && right <= rowsInterval.end
        ? pluckSubarray(rows, rowsStart, left, right) // rows have higher priority
        : pluckSubarray(cacheRows, cacheStart, left, right);

      result = result.concat(chunk);
    }
  }

  return {
    skip: breakpoints[0],
    rows: result,
  };
};

export const calculateRequestedRange: CalculateRequestedRangeFn = (
  loadedInterval, newRange, referenceIndex, pageSize,
) => {
  const isAdjacentPage = Math.abs(loadedInterval.start - newRange.start) < 2 * pageSize;
  if (isAdjacentPage) {
    return intervalUtil.difference(newRange, loadedInterval);
  }

  const useFirstHalf = referenceIndex % pageSize < pageSize / 2;
  const isLastPage = intervalUtil.getLength(newRange) / pageSize < 3;
  const start = useFirstHalf || isLastPage
    ? newRange.start
    : newRange.start + pageSize;
  const end = Math.min(newRange.end, start + 2 * pageSize);

  return { start, end };
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

  const rows = pluckSubarray(
    virtualRows.rows, virtualRows.skip, intersection.start, intersection.end,
  );

  return {
    rows,
    skip: intersection.start,
  };
};

export const getAvailableRowCount: PureComputed<[boolean, number, number, number], number> = (
  infiniteScroll, nextRowCount, lastRowCount, totalRowCount,
) => {
  return (infiniteScroll
    ? Math.min(
        Math.max(nextRowCount, lastRowCount),
        totalRowCount)
    : totalRowCount
  );
};
