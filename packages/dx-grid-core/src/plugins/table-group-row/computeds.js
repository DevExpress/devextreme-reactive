import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_GROUP_TYPE } from './constants';
import { tableKeyGetter } from '../../utils/table';

const tableColumnsWithDraftGrouping = (tableColumns, draftGrouping) =>
  tableColumns
    .reduce((acc, tableColumn) => {
      const columnDraftGrouping = draftGrouping
        .find(grouping => (tableColumn.type === TABLE_DATA_TYPE
          && grouping.columnName === tableColumn.id));
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
    ({ type: TABLE_GROUP_TYPE, id: group.columnName, width: groupIndentColumnWidth })),
  ...tableColumnsWithDraftGrouping(tableColumns, draftGrouping),
];

export const tableRowsWithGrouping = tableRows =>
  tableRows.map((tableRow) => {
    if (tableRow.type !== TABLE_DATA_TYPE || tableRow.row.type !== 'groupRow') return tableRow;
    return {
      ...tableRow,
      id: `${tableRow.row.column.name}_${tableRow.row.key}`,
      type: TABLE_GROUP_TYPE,
      colSpanStart: tableKeyGetter({ type: TABLE_GROUP_TYPE, id: tableRow.row.column.name }),
    };
  });
