export const rowIdGetter = (getRowId, rows) => {
  if (!getRowId) {
    const map = new Map(rows.map((row, rowIndex) => [row, rowIndex]));
    return row => map.get(row);
  }
  return getRowId;
};

export const cellValueGetter = (getCellValue, columns) => {
  if (getCellValue) {
    return getCellValue;
  }

  let useFastAccessor = true;
  const map = columns.reduce((acc, column) => {
    if (column.getCellValue) {
      useFastAccessor = false;
      acc[column.name] = column.getCellValue;
    }
    return acc;
  }, {});

  return useFastAccessor ?
    (row, columnName) => row[columnName] :
    (row, columnName) => (map[columnName] ? map[columnName](row, columnName) : row[columnName]);
};
