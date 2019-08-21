import { TABLE_DATA_TYPE } from '../table/constants';
import { TableColumn, SpecifyWidthsFn, TableColumnsWithWidthFn, ErrorFn } from '../../types';
import { isValidValue, convertWidth } from './helpers';

const VALID_UNITS = ['px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];
const NOT_FOR_WIDGET_UNITS = ['%'];

const UNSET_COLUMN_WIDTH_ERROR = [
  'The "$1" column\'s width is not specified.',
  'The TableColumnResizing plugin requires that all columns have the specified width.',
].join('\n');

const UNAVAILABLE_RESIZING_MODE_ERROR = [
  'The "$1" column\'s width specified like non-number type.',
  'The TableColumnResizing plugin requires nextColumnResizing mode,',
  'when column width define with some non-number type.',
].join('\n');

const INVALID_RESIZING_MODE_ERROR = [
  'The "$1" resizing mode in invalid mode.',
  'Please, check columnResizingMode property.',
].join('\n');

const INVALID_TYPE_ERROR = [
  'The "$1" column\'s width specified like invalid type.',
  'The TableColumnResizing plugin requires that all columns have the valid unit.',
].join('\n');

const specifyWidths: SpecifyWidthsFn = (tableColumns, widths, columnResizingMode, onAbsence) => {
  // console.log(widths);
  if (columnResizingMode !== 'widget' && columnResizingMode !== 'nextColumn') {
    onAbsence(columnResizingMode, 'invalidMode');
  }
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
          } else if (columnResizingMode === 'widget' && isValidValue(width, NOT_FOR_WIDGET_UNITS)) {
            onAbsence(columnName, 'wrongMode');
          }
        }
        if (width === undefined) {
          acc.push(tableColumn);
        } else {
          acc.push({ ...tableColumn, width: convertWidth(width) });
        }
      } else {
        acc.push(tableColumn);
      }
      // console.log(acc);
      return acc;
    }, [] as TableColumn[]);
};

export const tableColumnsWithWidths: TableColumnsWithWidthFn = (
  tableColumns, columnWidths, columnResizingMode,
) => specifyWidths(tableColumns, columnWidths, columnResizingMode, throwError);

export const tableColumnsWithDraftWidths: TableColumnsWithWidthFn = (
  tableColumns, draftColumnWidths, columnResizingMode,
) => specifyWidths(tableColumns, draftColumnWidths, columnResizingMode, () => {});

const throwError: ErrorFn = (target, errorType) => {
  switch (errorType) {
    case 'undefinedColumn': throw new Error(UNSET_COLUMN_WIDTH_ERROR.replace('$1', target));
    case 'wrongMode': throw new Error(UNAVAILABLE_RESIZING_MODE_ERROR.replace('$1', target));
    case 'invalidType': throw new Error(INVALID_TYPE_ERROR.replace('$1', target));
    case 'invalidMode': throw new Error(INVALID_RESIZING_MODE_ERROR.replace('$1', target));
  }
};
