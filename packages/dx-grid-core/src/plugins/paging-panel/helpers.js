export const firstRowOnPage = (currentPage, pageSize, totalCount) => {
  if (totalCount === 0) {
    return 0;
  }
  return pageSize ? (currentPage * pageSize) + 1 : 1;
};

export const lastRowOnPage = (currentPage, pageSize, totalRowCount) => {
  let result = totalRowCount;
  if (pageSize) {
    const index = (currentPage + 1) * pageSize;
    result = index > totalRowCount ? totalRowCount : index;
  }

  return result;
};

export const calculateStartPage = (currentPage, maxButtonCount, totalPageCount) => Math.max(
  Math.min(
    currentPage - Math.floor(maxButtonCount / 2, 10),
    (totalPageCount - maxButtonCount) + 1,
  ),
  1,
);
