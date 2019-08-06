import {
  getRowsVisibleBoundary, getColumnBoundaries,
} from '../../utils/virtual-table';
import { GetViewportFn } from '../../types';
import { arraysEqual } from './utils';

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
