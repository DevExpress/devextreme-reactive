import { GRID_GROUP_CHECK } from '../integrated-grouping/constants';

const warnIfRowIdUndefined = getRowId => (row) => {
  const result = getRowId(row);
  if (!row[GRID_GROUP_CHECK] && result === undefined) {
    // eslint-disable-next-line no-console
    console.warn('The row id is undefined. Check the getRowId function. The row is', row);
  }
  return result;
};

export const rowIdGetter = (getRowId, rows) => {
  if (!getRowId) {
    const map = new Map(rows.map((row, rowIndex) => [row, rowIndex]));
    return row => map.get(row);
  }
  return warnIfRowIdUndefined(getRowId);
};

const defaultGetCellValue = (row, columnName) => row[columnName];
export const cellValueGetter = (getCellValue = defaultGetCellValue, columns) => {
  let useFastAccessor = true;
  const map = columns.reduce((acc, column) => {
    if (column.getCellValue) {
      useFastAccessor = false;
      acc[column.name] = column.getCellValue;
    }
    return acc;
  }, {});

  if (useFastAccessor) {
    return getCellValue;
  }

  return (row, columnName) => (map[columnName]
    ? map[columnName](row, columnName)
    : getCellValue(row, columnName));
};
