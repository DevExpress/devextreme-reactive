import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_GROUP_TYPE } from './constants';

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
    if (tableRow.type !== TABLE_DATA_TYPE || tableRow.row.type !== 'groupRow') return tableRow;
    return {
      ...tableRow,
      key: `${TABLE_GROUP_TYPE}_${tableRow.row.key}`,
      type: TABLE_GROUP_TYPE,
      colSpanStart: `${TABLE_GROUP_TYPE}_${tableRow.row.groupedBy}`,
    };
  });
