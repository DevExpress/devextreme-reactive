export const paginate = (rows, pageSize, page) =>
  rows.slice(pageSize * page, pageSize * (page + 1));

export const ensurePageHeaders = (rows, pageSize) => {
  const result = rows.slice();
  let currentIndex = pageSize;

  while (result.length > currentIndex) {
    const parentRows = [];
    let row = result[currentIndex];

    while (row._parentRow) {
      parentRows.unshift(row._parentRow);
      row = row._parentRow;
    }

    if (parentRows.length) {
      result.splice(currentIndex, 0, ...parentRows);
    }

    currentIndex += pageSize;
  }

  return result;
};
