import { PureComputed } from '@devexpress/dx-core';
import { NthRowOnPageFn } from '../../types';

export const firstRowOnPage: NthRowOnPageFn = (currentPage, pageSize, totalCount) => {
  if (totalCount === 0) {
    return 0;
  }
  return pageSize ? (currentPage * pageSize) + 1 : 1;
};

export const lastRowOnPage: NthRowOnPageFn = (currentPage, pageSize, totalRowCount) => {
  let result = totalRowCount;
  if (pageSize) {
    const index = (currentPage + 1) * pageSize;
    result = index > totalRowCount ? totalRowCount : index;
  }

  return result;
};

export const calculateStartPage: PureComputed<[number, number, number]> = (
  currentPage, maxButtonCount, totalPageCount,
) => (
  Math.max(
    Math.min(
    currentPage - Math.floor(maxButtonCount / 2),
      (totalPageCount - maxButtonCount) + 1,
    ),
    1,
  )
);
