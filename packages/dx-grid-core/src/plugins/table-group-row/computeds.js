import { TABLE_DATA_TYPE, TABLE_UNKNOWN_TYPE } from '../table-view/constants';
import { TABLE_GROUP_TYPE } from './constants';
import { GRID_GROUP_TYPE } from '../local-grouping/constants';

const tableColumnsWithDraftGrouping = (tableColumns, draftGrouping, showColumnWhenGrouped) =>
  tableColumns
    .reduce((acc, tableColumn) => {
      const isDataColumn = tableColumn.type === TABLE_DATA_TYPE;
      const tableColumnName = isDataColumn ? tableColumn.column.name : '';
      const columnDraftGrouping = draftGrouping
        .find(grouping => grouping.columnName === tableColumnName);

      if (!columnDraftGrouping || showColumnWhenGrouped(tableColumnName)) {
        return [...acc, tableColumn];
      } else if (columnDraftGrouping.mode === 'remove' || columnDraftGrouping.mode === 'add') {
        return [...acc, {
          ...tableColumn,
          draft: true,
        }];
      }
      return acc;
    }, []);

export const tableColumnsWithGrouping = (
  tableColumns,
  grouping,
  draftGrouping,
  groupIndentColumnWidth,
  showColumnWhenGrouped,
) => [
  ...grouping.map((columnGrouping) => {
    const groupedColumn = tableColumns
      .find(tableColumn =>
        tableColumn.type === TABLE_DATA_TYPE &&
        tableColumn.column.name === columnGrouping.columnName)
      .column;
    return {
      key: `${TABLE_GROUP_TYPE}_${groupedColumn.name}`,
      type: TABLE_GROUP_TYPE,
      column: groupedColumn,
      width: groupIndentColumnWidth,
    };
  }),
  ...tableColumnsWithDraftGrouping(tableColumns, draftGrouping, showColumnWhenGrouped),
];

export const tableRowsWithGrouping = tableRows =>
  tableRows.map((tableRow) => {
    const { type, gridRow } = tableRow;
    const { row } = gridRow;
    if ((type !== TABLE_UNKNOWN_TYPE && type !== TABLE_DATA_TYPE)
      || (gridRow.type !== GRID_GROUP_TYPE && row.type !== 'groupRow')) {
      return tableRow;
    }
    return {
      ...tableRow,
      key: `${TABLE_GROUP_TYPE}_${row.key}`,
      type: TABLE_GROUP_TYPE,
      colSpanStart: `${TABLE_GROUP_TYPE}_${gridRow.groupedBy || row.groupedBy}`,
      row,
    };
  });
