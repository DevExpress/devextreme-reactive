import { clamp } from './helpers';
import { Row, GetRowLevelKeyFn, CurrentPageFn } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

// tslint:disable-next-line:max-line-length
const PAGE_HEADERS_OVERFLOW_ERROR = 'Max row level exceeds the page size. Consider increasing the page size.';

export const paginatedRows: PureComputed<[Row[], number, number]> = (rows, pageSize, page) => (
  pageSize
    ? rows.slice(pageSize * page, pageSize * (page + 1))
    : rows as Row[]
);

export const rowsWithPageHeaders: PureComputed<[Row[], number, GetRowLevelKeyFn]> = (
  rows, pageSize, getRowLevelKey,
) => {
  if (!pageSize || !getRowLevelKey) return rows as Row[];

  let result = rows.slice();

  let headerRows: any[] = [];
  let currentIndex = 0;
  while (result.length > currentIndex) {
    const row = result[currentIndex];
    const levelKey = getRowLevelKey(row);
    if (levelKey) {
      const headerIndex = headerRows.findIndex(headerRow => getRowLevelKey(headerRow) === levelKey);
      // tslint:disable-next-line:prefer-conditional-expression
      if (headerIndex === -1) {
        headerRows = [...headerRows, row];
      } else {
        headerRows = [...headerRows.slice(0, headerIndex), row];
      }
      if (headerRows.length >= pageSize) {
        throw new Error(PAGE_HEADERS_OVERFLOW_ERROR);
      }
    }
    const indexInPage = currentIndex % pageSize;
    if (indexInPage < headerRows.length && row !== headerRows[indexInPage]) {
      result = [
        ...result.slice(0, currentIndex),
        headerRows[indexInPage],
        ...result.slice(currentIndex),
      ];
    }
    currentIndex += 1;
  }

  return result;
};

export const rowCount = (rows: Row[]) => rows.length;

export const pageCount: PureComputed<[number, number]> = (count, pageSize) => (
  pageSize ? Math.ceil(count / pageSize) : 1
);

export const currentPage: CurrentPageFn = (
  page, totalCount, pageSize, setCurrentPage,
) => {
  const totalPages = pageCount(totalCount, pageSize);
  const adjustedCurrentPage = clamp(page, totalPages - 1);
  if (page !== adjustedCurrentPage) {
    setTimeout(() => setCurrentPage(adjustedCurrentPage));
  }
  return adjustedCurrentPage;
};
