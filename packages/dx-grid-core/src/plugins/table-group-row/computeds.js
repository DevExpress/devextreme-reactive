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
  ...grouping.map(group =>
    ({
      key: `${TABLE_GROUP_TYPE}_${group.columnName}`,
      type: TABLE_GROUP_TYPE,
      groupKey: group.columnName,
      width: groupIndentColumnWidth,
    })),
  ...tableColumnsWithDraftGrouping(tableColumns, draftGrouping),
];

export const tableRowsWithGrouping = tableRows =>
  tableRows.map((tableRow) => {
    if (tableRow.type !== TABLE_DATA_TYPE || tableRow.row.type !== 'groupRow') return tableRow;
    const groupKey = tableRow.row.column.name;
    const groupValue = tableRow.row.value;
    return {
      ...tableRow,
      key: `${TABLE_GROUP_TYPE}_${groupKey}_${groupValue}`,
      type: TABLE_GROUP_TYPE,
      groupKey,
      groupValue,
      colSpanStart: `${TABLE_GROUP_TYPE}_${groupKey}`,
    };
  });
