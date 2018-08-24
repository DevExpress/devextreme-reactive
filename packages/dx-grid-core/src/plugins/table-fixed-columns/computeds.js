import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE, TABLE_FIXED_TYPE } from './constants';

export const tableColumnsWithFixed = (
  tableColumns,
  beforeColumnNames, beforeColumnTypes,
  afterColumnNames, afterColumnTypes,
) => tableColumns
  .map((tableColumn) => {
    let fixed;
    if (tableColumn.column) {
      if (beforeColumnNames.indexOf(tableColumn.column.name) !== -1) {
        fixed = FIXED_COLUMN_BEFORE_SIDE;
      } else if (afterColumnNames.indexOf(tableColumn.column.name) !== -1) {
        fixed = FIXED_COLUMN_AFTER_SIDE;
      }
    } else if (beforeColumnTypes.indexOf(tableColumn.type) !== -1) {
      fixed = FIXED_COLUMN_BEFORE_SIDE;
    } else if (afterColumnTypes.indexOf(tableColumn.type) !== -1) {
      fixed = FIXED_COLUMN_AFTER_SIDE;
    }
    return fixed ? { ...tableColumn, fixed } : tableColumn;
  });

export const tableHeaderRowsWithFixed = tableHeaderRows => [
  ...tableHeaderRows,
  { type: TABLE_FIXED_TYPE, key: TABLE_FIXED_TYPE, height: 0 },
];
