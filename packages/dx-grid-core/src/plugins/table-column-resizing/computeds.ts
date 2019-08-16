import { TABLE_DATA_TYPE } from '../table/constants';
import { TableColumn, SpecifyWidthsFn, TableColumnsWithWidthFn } from '../../types';
import { isValidValue } from './helpers';

const VALID_UNITS = ['px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];
const ONLY_NEXT_COLUMN_RESIZE_UNITS = ['%'];

const UNSET_COLUMN_WIDTH_ERROR = [
  'The "$1" column\'s width is not specified.',
  'The TableColumnResizing plugin requires that all columns have the specified width.',
].join('\n');

const UNAVAILABLE_RESIZING_MODE_ERROR = [
  'The "$1" column\'s width specified like non-number type.',
  'The TableColumnResizing plugin requires nextColumnResizing mode,',
  'when column width define with some non-number type.',
].join('\n');

const INVALID_TYPE_ERROR = [
  'The "$1" column\'s width specified like invalid type.',
  'The TableColumnResizing plugin requires that all columns have the valid unit.',
].join('\n');

const specifyWidths: SpecifyWidthsFn = (tableColumns, widths, nextColumnResizing, onAbsence) => {
  if (!widths.length) return tableColumns;
  return tableColumns
    .reduce((acc, tableColumn) => {
      if (tableColumn.type === TABLE_DATA_TYPE) {
        const columnName = tableColumn.column!.name;
        const column = widths.find(el => el.columnName === columnName);
        const width = column && column.width;
        if (typeof width !== 'number') {
          if (width === undefined) {
            onAbsence(columnName, 'undefinedColumn');
          } else if (!isValidValue(width, VALID_UNITS)) {
            onAbsence(columnName, 'invalidType');
          } else if (!nextColumnResizing && isValidValue(width, ONLY_NEXT_COLUMN_RESIZE_UNITS)) {
            onAbsence(columnName, 'wrongMode');
          }
        }
        if (width === undefined) {
          acc.push(tableColumn);
        } else {
          acc.push({ ...tableColumn, width });
        }
      } else {
        acc.push(tableColumn);
      }
      return acc;
    }, [] as TableColumn[]);
};

export const tableColumnsWithWidths: TableColumnsWithWidthFn = (
  tableColumns, columnWidths, nextColumnResizing,
) => specifyWidths(tableColumns, columnWidths, nextColumnResizing, (columnName, errorType) => {
  switch (errorType) {
    case 'undefinedColumn': throw new Error(UNSET_COLUMN_WIDTH_ERROR.replace('$1', columnName));
    case 'wrongMode': throw new Error(UNAVAILABLE_RESIZING_MODE_ERROR.replace('$1', columnName));
    case 'invalidType': throw new Error(INVALID_TYPE_ERROR.replace('$1', columnName));
  }
});

export const tableColumnsWithDraftWidths: TableColumnsWithWidthFn = (
  tableColumns, draftColumnWidths, nextColumnResizing,
) => specifyWidths(tableColumns, draftColumnWidths, nextColumnResizing, () => {});
