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
  'The TableColumnResizing plugin requires nextColumn resizing mode,',
  'when column width define with some non-number type.',
].join('\n');

const INVALID_RESIZING_MODE_ERROR = [
  'The "$1" resizing mode in invalid mode.',
  'Please, check resizingMode property.',
].join('\n');

const INVALID_TYPE_ERROR = [
  'The "$1" column\'s width specified like string with invalid type or value.',
  'The TableColumnResizing plugin requires that all columns have the valid value.',
].join('\n');

const NEGATIVE_WIDTH_ERROR = [
  'The "$1" column\'s width defined less than 0.',
  'The TableColumnResizing plugin requires that all columns have non-negative width.',
].join('\n');

const specifyWidths: SpecifyWidthsFn = (tableColumns, widths, resizingMode, onAbsence) => {
  if (resizingMode !== 'widget' && resizingMode !== 'nextColumn') {
    onAbsence(resizingMode, 'invalidMode');
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
          } else if (resizingMode === 'widget' && isValidValue(width, NOT_FOR_WIDGET_UNITS)) {
            onAbsence(columnName, 'wrongMode');
          }
        } else if (width < 0) {
          onAbsence(columnName, 'negativeWidth');
        }
        if (width === undefined) {
          acc.push(tableColumn);
        } else {
          acc.push({ ...tableColumn, width: convertWidth(width) });
        }
      } else {
        acc.push(tableColumn);
      }
      return acc;
    }, [] as TableColumn[]);
};

export const tableColumnsWithWidths: TableColumnsWithWidthFn = (
  tableColumns, columnWidths, resizingMode,
) => specifyWidths(tableColumns, columnWidths, resizingMode, throwError);

export const tableColumnsWithDraftWidths: TableColumnsWithWidthFn = (
  tableColumns, draftColumnWidths, resizingMode,
) => specifyWidths(tableColumns, draftColumnWidths, resizingMode, () => {});

const throwError: ErrorFn = (target, errorType) => {
  switch (errorType) {
    case 'undefinedColumn': throw new Error(UNSET_COLUMN_WIDTH_ERROR.replace('$1', target));
    case 'wrongMode': throw new Error(UNAVAILABLE_RESIZING_MODE_ERROR.replace('$1', target));
    case 'invalidType': throw new Error(INVALID_TYPE_ERROR.replace('$1', target));
    case 'invalidMode': throw new Error(INVALID_RESIZING_MODE_ERROR.replace('$1', target));
    case 'negativeWidth': throw new Error(NEGATIVE_WIDTH_ERROR.replace('$1', target));
  }
};
