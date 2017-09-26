export const dataRows = data => data.map((rowData, index) => ({ rowData, defaultRowId: index }));

export const rowIdGetter = getRowDataId => (row) => {
  if (getRowDataId) {
    return getRowDataId(row.rowData);
  }
  return row.defaultRowId;
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
