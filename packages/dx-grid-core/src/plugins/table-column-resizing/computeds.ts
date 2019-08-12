import { TABLE_DATA_TYPE } from '../table/constants';
import { TableColumn, SpecifyWidthsFn, TableColumnsWithWidthFn } from '../../types';

// const UNSET_COLUMN_WIDTH_ERROR = [
//   'The "$1" column\'s width is not specified.',
//   'The TableColumnResizing plugin requires that all columns have the specified width.',
// ].join('\n');

const UNAVAILABLE_RESIZING_MODE = [
  'The "$1" column\'s width specified like auto.',
  'AUTO ERROR',
].join('\n');

const specifyWidths: SpecifyWidthsFn = (tableColumns, widths, nextColumnResizing, onAbsence) => {
  if (!widths.length) return tableColumns;
  return tableColumns
    .reduce((acc, tableColumn) => {
      if (tableColumn.type === TABLE_DATA_TYPE) {
        const columnName = tableColumn.column!.name;
        const column = widths.find(el => el.columnName === columnName);
        const width = column && column.width;
        if (width === undefined || width === 'auto') {
          if (!nextColumnResizing) {
            onAbsence(columnName);
          }
          acc.push(tableColumn);
        } else {
          acc.push({ ...tableColumn, width: width as number });
        }
      } else {
        acc.push(tableColumn);
      }
      return acc;
    }, [] as TableColumn[]);
};

export const tableColumnsWithWidths: TableColumnsWithWidthFn = (
  tableColumns, columnWidths, nextColumnResizing,
) => specifyWidths(tableColumns, columnWidths, nextColumnResizing, (columnName) => {
  throw new Error(UNAVAILABLE_RESIZING_MODE.replace('$1', columnName));
});

export const tableColumnsWithDraftWidths: TableColumnsWithWidthFn = (
  tableColumns, draftColumnWidths, nextColumnResizing,
) => specifyWidths(tableColumns, draftColumnWidths, nextColumnResizing, () => {});
