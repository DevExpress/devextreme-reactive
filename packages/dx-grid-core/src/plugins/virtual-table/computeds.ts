import {
  getRowsVisibleBoundary,
} from '../../utils/virtual-table';
import { VisibleBoundsFn, PageTriggersMetaFn } from '../../types';

export const visibleRowsBounds: VisibleBoundsFn = (
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

/** how many rows up and down before next page request */
export const pageTriggersMeta: PageTriggersMetaFn = (
  state, getters, estimatedRowHeight,
) => {
  const {
    visibleRowBoundaries: rowsBoundaries, virtualPageSize, virtualRows,
    loadedRowsStart, remoteDataEnabled,
  } = getters;

  if (!remoteDataEnabled) {
    return {};
  }

  const { viewportTop, containerHeight } = state;
  const loadedCount = virtualRows.rows.length;

  if (loadedCount === 0) {
    return {};
  }

  const topTriggerIndex = loadedRowsStart > 0 ? loadedRowsStart + virtualPageSize : 0;
  const bottomTriggerIndex = loadedRowsStart + loadedCount - virtualPageSize;
  const firstRowIndex = rowsBoundaries[0];
  const visibleCount = rowsBoundaries[1] - rowsBoundaries[0];
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
};
