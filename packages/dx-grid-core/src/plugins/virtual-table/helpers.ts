import {
  getRowsVisibleBoundary, getColumnBoundaries,
} from '../../utils/virtual-table';
import { GetViewportFn, CheckTableColumnWidths, TableColumn } from '../../types';
import { arraysEqual } from './utils';

const VALID_UNITS = ['px', ''];
/* tslint:disable max-line-length */
const VIRTUAL_TABLE_ERROR = 'The columnExtension property of the VirtualTable plugin is given an invalid value.';

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
  if (viewportTop !== viewport.top) {
    result = { ...result, top: viewportTop };
  }
  if (viewportLeft !== viewport.left) {
    result = { ...result, left: viewportLeft };
  }
  if (containerWidth !== viewport.width) {
    result = { ...result, width: containerWidth };
  }
  if (containerHeight !== viewport.height) {
    result = { ...result, height: containerHeight };
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

export const checkColumnWidths: CheckTableColumnWidths = (tableColumns) => {
  return tableColumns.reduce((acc, tableColumn) => {
    const { width } = tableColumn;
    if (typeof width === 'string') {
      const numb = parseInt(width, 10);
      const unit = numb ? width.substr(numb.toString().length) : width;
      const isValidUnit = VALID_UNITS.some(validUnit => validUnit === unit);
      if (!isValidUnit) {
        throw new Error(VIRTUAL_TABLE_ERROR);
      }
      acc.push({ ...tableColumn, width: numb });
    } else {
      acc.push(tableColumn);
    }
    return acc;
  }, []  as TableColumn[]);
};
