import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_GROUP_TYPE } from './constants';

const tableColumnsWithDraftGrouping = (tableColumns, draftGrouping) =>
  tableColumns
    .reduce((acc, tableColumn) => {
      const columnDraftGrouping = draftGrouping
        .find(grouping => (tableColumn.type === TABLE_DATA_TYPE
          && grouping.columnName === tableColumn.column.name));
      if (!columnDraftGrouping) {
        return [...acc, tableColumn];
      } else if (columnDraftGrouping.mode === 'remove' || columnDraftGrouping.mode === 'add') {
        return [...acc, {
          ...tableColumn,
          isDraft: true,
        }];
      }
      return acc;
    }, []);

export const tableColumnsWithGrouping = (
  tableColumns, grouping, draftGrouping, groupIndentColumnWidth,
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
  ...tableColumnsWithDraftGrouping(tableColumns, draftGrouping),
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
