import { TABLE_DATA_TYPE } from '../table/constants';
import { TableColumn, SpecifyWidthsFn, TableColumnsWithWidthFn, ErrorFn } from '../../types';
import { isValidValue, convertWidth } from './helpers';

const VALID_UNITS = ['px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];
const NOT_FOR_WIDGET_UNITS = ['%'];
/* tslint:disable max-line-length */
const COLUMN_RESIZING_ERROR = 'The columnWidths property of the TableColumnResizing plugin is given an invalid value.';

const specifyWidths: SpecifyWidthsFn = (tableColumns, widths, resizingMode, onError) => {
  if (resizingMode !== 'widget' && resizingMode !== 'nextColumn') {
    onError();
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
            onError();
          } else if (!isValidValue(width, VALID_UNITS)) {
            onError();
          } else if (resizingMode === 'widget' && isValidValue(width, NOT_FOR_WIDGET_UNITS)) {
            onError();
          }
        } else if (width < 0) {
          onError();
        }
        if (width === undefined) {
          acc.push(tableColumn);
        } else {
          acc.push({ ...tableColumn, width: convertWidth(width), resizingMode });
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

const throwError: ErrorFn = () => {
  throw new Error(COLUMN_RESIZING_ERROR);
};
