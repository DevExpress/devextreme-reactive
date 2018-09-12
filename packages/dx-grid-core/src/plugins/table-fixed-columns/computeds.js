import { TABLE_DATA_TYPE } from '../table/constants';
import { FIXED_COLUMN_LEFT_SIDE, FIXED_COLUMN_RIGHT_SIDE, TABLE_FIXED_TYPE } from './constants';

export const tableColumnsWithFixed = (
  tableColumns,
  leftColumnNames, leftColumnTypes,
  rightColumnNames, rightColumnTypes,
) => tableColumns
  .map((tableColumn) => {
    let fixed;
    if (tableColumn.type === TABLE_DATA_TYPE) {
      if (leftColumnNames.indexOf(tableColumn.column.name) !== -1) {
        fixed = FIXED_COLUMN_LEFT_SIDE;
      } else if (rightColumnNames.indexOf(tableColumn.column.name) !== -1) {
        fixed = FIXED_COLUMN_RIGHT_SIDE;
      }
    } else if (leftColumnTypes.indexOf(tableColumn.type) !== -1) {
      fixed = FIXED_COLUMN_LEFT_SIDE;
    } else if (rightColumnTypes.indexOf(tableColumn.type) !== -1) {
      fixed = FIXED_COLUMN_RIGHT_SIDE;
    }
    return fixed ? { ...tableColumn, fixed } : tableColumn;
  });

export const tableHeaderRowsWithFixed = tableHeaderRows => [
  ...tableHeaderRows,
  { type: TABLE_FIXED_TYPE, key: TABLE_FIXED_TYPE, height: 0 },
];
