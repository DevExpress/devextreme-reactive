import {
  getRowsVisibleBoundary, getColumnBoundaries,
} from '../../utils/virtual-table';
import {
  GetViewportFn,
  CheckTableColumnWidths,
  TableColumn,
  GetScrollHeightByIndex,
  GetScrollPosition,
  GetTopRowId,
  GetScrollLeft,
  IsColumnsWidthDifferent,
} from '../../types';
import { arraysEqual } from './utils';
import { TOP_POSITION, BOTTOM_POSITION, LEFT_POSITION } from './constants';

const VALID_UNITS = ['px', ''];
/* tslint:disable max-line-length */
const VIRTUAL_TABLE_ERROR = 'The columnExtension property of the VirtualTable plugin is given an invalid value.';

export const getViewport: GetViewportFn = (
  state, getters, getRowHeight, getColumnWidth,
) => {
  const {
    viewportTop, skipItems, viewportLeft, containerWidth, containerHeight,
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
    tableBodyRows, viewportTop, containerHeight,
    getRowHeight, skipItems, loadedRowsStart, isDataRemote,
  );
  const headerRows = getRowsVisibleBoundary(
    tableHeaderRows, 0, 0,
    getRowHeight, [0, 0], 0, false,
  );
  const footerRows = getRowsVisibleBoundary(
    tableFooterRows, 0, 0,
    getRowHeight, [0, 0], 0, false,
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

export const calculateScrollHeight: GetScrollHeightByIndex = (rowHeight, index) =>
  index > -1 ? rowHeight * index : undefined;

export const getScrollTop: GetScrollPosition = (rows, rowsCount, rowId, rowHeight, isDataRemote) => {
  if (rowId === TOP_POSITION) {
    return 0;
  }
  if (rowId === BOTTOM_POSITION) {
    return rowsCount * rowHeight;
  }

  const searchIndexRequired = !isDataRemote && rowId !== undefined;
  const indexById = searchIndexRequired
    ? rows.findIndex(row => row.rowId === rowId)
    : undefined;

  return calculateScrollHeight(
    rowHeight,
    indexById!,
  );
};

export const getScrollLeft: GetScrollLeft = (columnCount, columnWidth, columnId) => {
  if (!columnId) {
    return;
  }
  if (columnId === LEFT_POSITION) {
    return 0;
  }
  return columnCount * columnWidth;
};

export const getTopRowId: GetTopRowId = (viewport, tableBodyRows, isDataRemote) => {
  const hasViewportRows = viewport && viewport.rows;
  const hasBodyRows = tableBodyRows && tableBodyRows.length;
  if (hasViewportRows && hasBodyRows && !isDataRemote) {
    const index = viewport.rows[0];

    return index < tableBodyRows.length ? tableBodyRows[index].rowId : undefined;
  }

  return undefined;
};

export const isColumnsWidthDifferent: IsColumnsWidthDifferent = (prevColumns, columns) => {
  return prevColumns.some((column) => {
    const currentColumn = columns.find(c => c.key === column.key);
    return currentColumn ? currentColumn.width !== column.width : true;
  });
};
