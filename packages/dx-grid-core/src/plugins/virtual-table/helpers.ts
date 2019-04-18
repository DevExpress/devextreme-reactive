import { PageTriggersMetaFn } from '../../types';

/** how many rows up and down before next page request */
export const pageTriggersMeta: PageTriggersMetaFn = (
  { containerHeight, visibleRowBoundaries, estimatedRowHeight },
  { pageSize, virtualRows },
) => {
  const loadedCount = virtualRows.rows.length;
  if (loadedCount === 0) {
    return null;
  }

  const loadedRowsStart = virtualRows.start;
  const topTriggerIndex = loadedRowsStart > 0 ? loadedRowsStart + pageSize : 0;
  const bottomTriggerIndex = loadedRowsStart + loadedCount - pageSize;
  const bodyBoundaries = visibleRowBoundaries.body;
  const firstRowIndex = bodyBoundaries.start;
  const visibleCount = bodyBoundaries.end - bodyBoundaries.start;
  const middleIndex = firstRowIndex + Math.round(visibleCount / 2);

  const middlePosition = visibleRowBoundaries.viewportTop + containerHeight / 2;

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
