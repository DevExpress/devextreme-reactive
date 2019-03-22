import { GRID_GROUP_CHECK } from '../integrated-grouping/constants';
import { GetRowIdFn, Row, RowId, GetCellValueFn, Column } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

const warnIfRowIdUndefined: PureComputed<[GetRowIdFn]> = getRowId => (row) => {
  const result = getRowId(row);
  if (!row[GRID_GROUP_CHECK] && result === undefined) {
    // tslint:disable-next-line: no-console
    console.warn('The row id is undefined. Check the getRowId function. The row is', row);
  }
  return result;
};

export const rowIdGetter: PureComputed<[GetRowIdFn, Row[]]> = (getRowId, rows) => {
  if (!getRowId) {
    const map = new Map(rows.map((row, rowIndex) => [row, rowIndex]) as [any, number]);
    return (row: Row) => map.get(row) as RowId;
  }
  return warnIfRowIdUndefined(getRowId);
};

const defaultGetCellValue: GetCellValueFn = (row, columnName) => row[columnName];

export const cellValueGetter: PureComputed<[GetCellValueFn, Column[]]> = (
  getCellValue = defaultGetCellValue, columns,
) => {
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
