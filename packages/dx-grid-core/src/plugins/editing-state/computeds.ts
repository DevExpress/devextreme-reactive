import { PureComputed } from '@devexpress/dx-core';
import {
  EditingColumnExtension, CreateRowChangeFn, Row, RowId, RowChanges,
} from '../../types';

export const changedRowsByIds: PureComputed<
  [any, RowId[]], RowChanges
> = (changes, rowIds) => {
  const result = {};
  rowIds.forEach((rowId) => {
    result[rowId] = changes[rowId];
  });
  return result;
};

export const addedRowsByIds: PureComputed<[Row[], RowId[]]> = (addedRows, rowIds) => {
  const rowIdSet = new Set(rowIds);
  const result: Row[] = [];
  addedRows.forEach((row, index) => {
    if (rowIdSet.has(index)) {
      result.push(row);
    }
  });
  return result;
};

const defaultCreateRowChange: CreateRowChangeFn = (row, value, columnName) => (
  { [columnName]: value }
);
export const createRowChangeGetter: PureComputed<
  [CreateRowChangeFn?, EditingColumnExtension[]?], CreateRowChangeFn
> = (
  createRowChange = defaultCreateRowChange,
  columnExtensions = [],
) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    if (columnExtension.createRowChange) {
      acc[columnExtension.columnName] = columnExtension.createRowChange;
    }
    return acc;
  }, {});

  return (row, value, columnName) => {
    if (map[columnName]) {
      return map[columnName](row, value, columnName);
    }
    return createRowChange(row, value, columnName);
  };
};
