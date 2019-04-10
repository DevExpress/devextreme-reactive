import {
  getRowsVisibleBoundary,
} from '../../utils/virtual-table';
import { RowsVisibleBoundaryFn } from '../../types';

export const visibleRowsBounds: RowsVisibleBoundaryFn = (
  state, getters, estimatedRowHeight, getRowHeight,
) => {
  const {
    viewportTop, containerHeight, headerHeight, footerHeight,
  } = state;
  const {
    loadedRowsStart, tableBodyRows,
  } = getters;

  return getRowsVisibleBoundary(
    tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight,
    getRowHeight, loadedRowsStart, estimatedRowHeight,
  );
};
