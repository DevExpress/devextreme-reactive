import {
  getColumnsVisibleBoundary, getRowsVisibleBoundary,
} from '../../utils/virtual-table';

export const visibleBounds = (
  state, getters, estimatedRowHeight, getColumnWidth, getRowHeight,
) => {
  const {
    viewportLeft, width, viewportTop, containerHeight, headerHeight, footerHeight,
  } = state;
  const {
    virtualRows, columns, tableBodyRows,
  } = getters;
  const loadedRowsStart = virtualRows.start;

  return {
    columns: getColumnsVisibleBoundary(columns, viewportLeft, width, getColumnWidth),
    bodyRows: getRowsVisibleBoundary(
      tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight,
      getRowHeight, loadedRowsStart, estimatedRowHeight,
    ),
  };
};

/** how many rows up and down before next page request */
export const pageTriggerPositions = (
  state, getters, estimatedRowHeight,
) => {
  const { viewportTop, containerHeight } = state;
  const { visibleBoundaries, virtualPageSize, virtualRows } = getters;
  const loadedStart = virtualRows.start;
  const loadedCount = virtualRows.rows.length;

  if (loadedCount === 0) {
    return [0, -1];
  }

  const topTriggerIndex = loadedStart > 0 ? loadedStart + virtualPageSize : 0;
  const bottomTriggerIndex = loadedStart + loadedCount - virtualPageSize;
  const firstRowIndex = visibleBoundaries.bodyRows[0];
  const visibleCount = visibleBoundaries.bodyRows[1] - visibleBoundaries.bodyRows[0];
  const middleIndex = firstRowIndex + Math.round(visibleCount / 2);

  const middlePosition = viewportTop + containerHeight / 2;

  const topTriggerOffset = (middleIndex - topTriggerIndex) * estimatedRowHeight;
  const bottomTriggerOffset = (bottomTriggerIndex - middleIndex) * estimatedRowHeight;
  const topTriggerPosition = middlePosition - topTriggerOffset;
  const bottomTriggerPosition = middlePosition + bottomTriggerOffset;

  return {
    topTriggerIndex,
    topTriggerPosition,
    bottomTriggerIndex,
    bottomTriggerPosition,
  };
}
