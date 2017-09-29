export const gridRows = data => data.map((row, index) => ({ row, defaultRowId: index }));

export const gridRowIdGetter = (getRowId) => {
  if (getRowId) {
    return gridRow => getRowId(gridRow.row);
  }
  return gridRow => gridRow.defaultRowId;
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
