import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';

export const getFixedColumnKeys = (tableColumns, fixedNames, fixedTypes) => tableColumns
  .filter(tableColumn => (
    (tableColumn.column && fixedNames.indexOf(tableColumn.column.name) !== -1)
    || fixedTypes.indexOf(tableColumn.type) !== -1
  ))
  .map(({ key }) => key);

export const isFixedCell = (tableColumn, fixedColumnNames, fixedColumnTypes) => (
  (tableColumn.column && fixedColumnNames.indexOf(tableColumn.column.name) !== -1)
  || fixedColumnTypes.indexOf(tableColumn.type) !== -1
);

export const getFixedSide = (
  tableColumn,
  beforeColumnNames, afterColumnNames,
  beforeColumnTypes, afterColumnTypes,
) => {
  if ((tableColumn.column && beforeColumnNames.indexOf(tableColumn.column.name) !== -1)
    || beforeColumnTypes.indexOf(tableColumn.type) !== -1) {
    return FIXED_COLUMN_BEFORE_SIDE;
  }
  if ((tableColumn.column && afterColumnNames.indexOf(tableColumn.column.name) !== -1)
    || afterColumnTypes.indexOf(tableColumn.type) !== -1) {
    return FIXED_COLUMN_AFTER_SIDE;
  }
  return null;
};
