import { intervalUtil } from './utils';
import {
  VirtualRows, Row, MergeRowsFn, CalculateRequestedRangeFn,
  Interval, GridViewport, GetRequestMeta, CorrectRangeFn,
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

const correctRequestedRange: CorrectRangeFn = (calculatedRange, referenceIndex, pageSize) => {
  const { start, end } = calculatedRange;

  if (start - referenceIndex > pageSize / 2) {
    return { start: start - pageSize, end: start };
  }
  return { start, end };
};

export const calculateRequestedRange: CalculateRequestedRangeFn = (
  virtualRows, newRange, pageSize, referenceIndex, isInfiniteScroll,
) => {
  const loadedInterval = intervalUtil.getRowsInterval(virtualRows);
  const isAdjacentPage = Math.abs(loadedInterval.start - newRange.start) < 2 * pageSize;
  if (isAdjacentPage) {
    const calculatedRange = intervalUtil.difference(newRange, loadedInterval);
    if (isInfiniteScroll && calculatedRange !== intervalUtil.empty) {
      return correctRequestedRange(calculatedRange, referenceIndex, pageSize);
    }
    return calculatedRange;
  }

  // load 3 pages at once because a missing page will be loaded anyway
  return newRange;
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
  isInfiniteScroll, newRowCount, lastRowCount, totalRowCount,
) => {
  return (isInfiniteScroll
    ? Math.min(
        Math.max(newRowCount, lastRowCount),
        totalRowCount)
    : totalRowCount
  );
};

export const getForceReloadInterval: PureComputed<[VirtualRows, number, number], Interval> = (
  virtualRows, pageSize, totalRowCount,
) => {
  const { start, end: intervalEnd } = intervalUtil.getRowsInterval(virtualRows);
  const end = Math.min(
    Math.max(start + pageSize * 2, intervalEnd),
    Math.max(start + pageSize * 2, totalRowCount),
  );
  return {
    start,
    end,
  };
};

export const getRequestMeta: GetRequestMeta = (
  referenceIndex, virtualRows, pageSize, totalRowCount, forceReload, isInfiniteScroll,
) => {
  const actualBounds = forceReload
    ? getForceReloadInterval(virtualRows, pageSize!, totalRowCount)
    : recalculateBounds(referenceIndex, pageSize!, totalRowCount);
  const requestedRange = forceReload
    ? actualBounds
    : calculateRequestedRange(
        virtualRows, actualBounds, pageSize!, referenceIndex, isInfiniteScroll,
      );

  return { requestedRange, actualBounds };
};

export const needFetchMorePages: PureComputed<[VirtualRows, number, number], boolean> = (
  virtualRows, referenceIndex,  pageSize,
) => {
  const { start, end } = intervalUtil.getRowsInterval(virtualRows);
  const loadCount = end - start;
  const topTriggerIndex = start > 0 ? start + pageSize : 0;
  const bottomTriggerIndex = Math.max(topTriggerIndex + pageSize, end - pageSize * 1.5);

  if (loadCount <= 0) {
    return false;
  }

  return (referenceIndex < topTriggerIndex || bottomTriggerIndex < referenceIndex);
};

export const getReferenceIndex: PureComputed<[GridViewport], number> = (
  { rows: [top, bottom] },
) => (
  (top + bottom) / 2
);

export const shouldSendRequest: PureComputed<[Interval, number, number], boolean> = (
  { start, end }, requestedPageIndex, requestedEndIndex
) => {
  const loadCount = (end - start);
  return (start !== requestedPageIndex || end !== requestedEndIndex) && loadCount > 0;
};
