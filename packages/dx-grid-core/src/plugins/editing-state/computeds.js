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

const defaultCreateRowChange = (row, columnName, value) => ({ [columnName]: value });
export const createRowChangeGetter = (
  createRowChange = defaultCreateRowChange,
  columnExtensions = [],
) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    if (columnExtension.createRowChange) {
      acc[columnExtension.columnName] = columnExtension.createRowChange;
    }
    return acc;
  }, {});

  return (row, columnName, value) => {
    if (map[columnName]) {
      return map[columnName](row, value, columnName);
    }
    return createRowChange(row, columnName, value);
  };
};
