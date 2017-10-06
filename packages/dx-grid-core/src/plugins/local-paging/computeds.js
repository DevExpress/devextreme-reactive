const PAGE_HEADERS_OVERFLOW_ERROR = [
  'The count of title rows exceeds the page size. Consider increasing the page size.',
  'Typically, title rows are group headers.',
].join('\n');

export const paginate = (rows, pageSize, page) => (
  pageSize ?
    rows.slice(pageSize * page, pageSize * (page + 1)) :
    rows
);

export const ensurePageHeaders = (rows, pageSize) => {
  if (!pageSize) {
    return rows;
  }

  let result = rows.slice();

  let headers = [];
  let currentIndex = 0;
  while (result.length > currentIndex) {
    const row = result[currentIndex];
    const headerKey = row._headerKey;
    if (headerKey) {
      const headerIndex = headers.findIndex(header => header._headerKey === headerKey);
      if (headerIndex === -1) {
        headers = [...headers, row];
      } else {
        headers = [...headers.slice(0, headerIndex), row];
      }
      if (headers.length >= pageSize) {
        throw new Error(PAGE_HEADERS_OVERFLOW_ERROR);
      }
    }
    const indexInPage = currentIndex % pageSize;
    if (indexInPage < headers.length && row !== headers[indexInPage]) {
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

export const rowCount = rows => rows.length;
