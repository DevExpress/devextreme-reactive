export const changedRowsByIds = (changes, rowIds) => {
  const result = {};
  rowIds.forEach((rowId) => {
    result[rowId] = changes[rowId];
  });
  return result;
};

export const newRowsByIds = (newRows, rowIds) => {
  const rowIdSet = new Set(rowIds);
  const result = [];
  newRows.forEach((row, index) => {
    if (rowIdSet.has(index)) {
      result.push(row);
    }
  });
  return result;
};
