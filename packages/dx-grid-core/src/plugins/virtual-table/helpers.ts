import {
  getRowsVisibleBoundary, getColumnBoundaries,
} from '../../utils/virtual-table';
import { GetViewportFn, TableColumnConverterFn, TableColumn } from '../../types';
import { arraysEqual } from './utils';

const VALID_UNITS = ['px', ''];
const INVALID_TYPE = [
  'The "$1" column\'s width specified like invalid type.',
  'The VirtualTable cannot work with relative column widths.',
].join('\n');

export const getViewport: GetViewportFn = (
  state, getters, estimatedRowHeight, getRowHeight, getColumnWidth,
) => {
  const {
    viewportTop, viewportLeft, containerWidth, containerHeight, headerHeight, footerHeight,
  } = state;
  const {
    loadedRowsStart,
    bodyRows: tableBodyRows,
    columns: tableColumns,
    headerRows: tableHeaderRows = [],
    footerRows: tableFooterRows = [],
    isDataRemote,
    viewport,
  } = getters;

  const rows = getRowsVisibleBoundary(
    tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight,
    getRowHeight, loadedRowsStart, estimatedRowHeight, isDataRemote,
  );
  const headerRows = getRowsVisibleBoundary(
    tableHeaderRows, 0, headerHeight,
    getRowHeight, 0, estimatedRowHeight, false,
  );
  const footerRows = getRowsVisibleBoundary(
    tableFooterRows, 0, footerHeight,
    getRowHeight, 0, estimatedRowHeight, false,
  );
  const columns = getColumnBoundaries(
    tableColumns, viewportLeft, containerWidth, getColumnWidth,
  );

  // NOTE: prevent unnecessary updates
  // e.g. when rows changed but bounds remain the same.
  let result = viewport;
  if (viewportTop !== viewport.viewportTop) {
    result = { ...result, viewportTop };
  }
  if (viewportLeft !== viewport.viewportLeft) {
    result = { ...result, viewportLeft };
  }
  if (!arraysEqual(rows, viewport.rows)) {
    result = { ...result, rows };
  }
  if (!arraysEqual(headerRows, viewport.headerRows)) {
    result = { ...result, headerRows };
  }
  if (!arraysEqual(footerRows, viewport.footerRows)) {
    result = { ...result, footerRows };
  }
  if (!arraysEqual(columns, viewport.columns, arraysEqual)) {
    result = { ...result, columns };
  }

  return result;
};

export const checkColumnWidths: TableColumnConverterFn = (tableColumns) => {
  return tableColumns.reduce((acc, tableColumn) => {
    const { width } = tableColumn;
    if (typeof width === 'string') {
      const numb = parseInt(width, 10);
      const unit = numb ? width.substr(numb.toString().length) : width;
      const isValidValue = VALID_UNITS.findIndex(validUnit => validUnit === unit) >= 0
        && !isNaN(numb);
      if (!isValidValue) {
        throw new Error(INVALID_TYPE.replace('$1', tableColumn.column!.name));
      }
      if (unit === 'px' || unit === '') {
        acc.push({ ...tableColumn, width: numb });
      } else {
        acc.push(tableColumn);
      }
    } else {
      acc.push(tableColumn);
    }
    return acc;
  }, [] as TableColumn[]);
};
