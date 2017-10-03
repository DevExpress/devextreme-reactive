const PAGE_HEADERS_OVERFLOW_ERROR = [
  'The count of title rows exceeds the page size. Consider increasing the page size.',
  'Typically, title rows are group headers.',
].join('\n');

export const paginatedGridRows = (gridRows, pageSize, page) => (
  pageSize ?
    gridRows.slice(pageSize * page, pageSize * (page + 1)) :
    gridRows
);

export const gridRowsWithPageHeaders = (gridRows, pageSize) => {
  if (!pageSize) {
    return gridRows;
  }

  let result = gridRows.slice();

  let headers = [];
  let currentIndex = 0;
  while (result.length > currentIndex) {
    const gridRow = result[currentIndex];
    const headerKey = gridRow.headerKey || gridRow.row._headerKey;
    if (headerKey) {
      const headerIndex = headers.findIndex(header => header.headerKey === headerKey);
      if (headerIndex === -1) {
        headers = [...headers, gridRow];
      } else {
        headers = [...headers.slice(0, headerIndex), gridRow];
      }
      if (headers.length >= pageSize) {
        throw new Error(PAGE_HEADERS_OVERFLOW_ERROR);
      }
    }
    const indexInPage = currentIndex % pageSize;
    if (indexInPage < headers.length && gridRow !== headers[indexInPage]) {
      result = [
        ...result.slice(0, currentIndex),
        headers[indexInPage],
        ...result.slice(currentIndex),
      ];
    }
    currentIndex += 1;
  }

  return result;
};

export const pageCount = (count, pageSize) => (
  pageSize ? Math.ceil(count / pageSize) : 1
);

export const gridRowsCount = gridRows => gridRows.length;
