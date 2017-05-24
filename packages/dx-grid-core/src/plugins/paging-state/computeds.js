export const paginate = (rows, pageSize, page) =>
  rows.slice(pageSize * page, pageSize * (page + 1));

export const ensurePageHeaders = (rows, pageSize) => {
  const result = rows.slice();

  const headers = [];
  let currentIndex = 0;
  while (result.length > currentIndex) {
    const row = result[currentIndex];
    const headerKey = row._headerKey;
    if (headerKey) {
      const headerIndex = headers.findIndex(header => header._headerKey === headerKey);
      if (headerIndex === -1) {
        headers.push(row);
      } else {
        headers.splice(headerIndex, headers.length - headerIndex, row);
      }
    }
    const indexInPage = currentIndex % pageSize;
    if (indexInPage < headers.length && row !== headers[indexInPage]) {
      result.splice(currentIndex, 0, headers[indexInPage]);
    }
    currentIndex += 1;
  }

  return result;
};

export const totalPageCount = (rows, pageSize) => Math.ceil(rows.length / pageSize);
