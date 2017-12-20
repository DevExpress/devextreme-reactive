export const changedRowsByIds = (changes, rowIds) => {
  const result = {};
  rowIds.forEach((rowId) => {
    result[rowId] = changes[rowId];
  });
  return result;
};

export const addedRowsByIds = (addedRows, rowIds) => {
  const rowIdSet = new Set(rowIds);
  const result = [];
  addedRows.forEach((row, index) => {
    if (rowIdSet.has(index)) {
      result.push(row);
    }
  });
  return result;
};

export const createRowChangeGetter = (createRowChange, columnExtensions = []) => {
  if (createRowChange) {
    return createRowChange;
  }

  const map = columnExtensions.reduce((acc, columnExtension) => {
    if (columnExtension.createRowChange) {
      acc[columnExtension.columnName] = columnExtension.createRowChange;
    }
    return acc;
  }, {});

  return (row, columnName, value) =>
    (map[columnName] ? map[columnName](row, value, columnName) : { [columnName]: value });
};
