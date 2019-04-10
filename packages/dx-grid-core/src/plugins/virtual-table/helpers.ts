import { Getters } from '@devexpress/dx-react-core';
import { PageTriggersMetaFn } from '../../types';

export const nextPageReferenceIndex = (
  payload: any,
  getters: Getters,
) => {
  const triggersMeta = pageTriggersMeta(payload, getters);
  if (triggersMeta === null) {
    return null;
  }

  const {
    topTriggerPosition, bottomTriggerPosition, topTriggerIndex, bottomTriggerIndex,
  } = triggersMeta;
  const { viewportTop, estimatedRowHeight, containerHeight } = payload;
  const referencePosition = viewportTop + containerHeight / 2;

  const getReferenceIndex = (triggetIndex: number, triggerPosition: number) => (
    triggetIndex + Math.round((referencePosition - triggerPosition) / estimatedRowHeight)
  );

  let referenceIndex = null;
  if (referencePosition < topTriggerPosition) {
    referenceIndex = getReferenceIndex(topTriggerIndex, topTriggerPosition);
  }
  if (bottomTriggerPosition < referencePosition) {
    referenceIndex = getReferenceIndex(bottomTriggerIndex, bottomTriggerPosition);
  }

  return referenceIndex;
};

/** how many rows up and down before next page request */
export const pageTriggersMeta: PageTriggersMetaFn = (
  { containerHeight, visibleRowBoundaries, estimatedRowHeight },
  { virtualPageSize, virtualRows, loadedRowsStart },
) => {
  const loadedCount = virtualRows.rows.length;

  if (loadedCount === 0) {
    return null;
  }

  const topTriggerIndex = loadedRowsStart > 0 ? loadedRowsStart + virtualPageSize : 0;
  const bottomTriggerIndex = loadedRowsStart + loadedCount - virtualPageSize;
  const firstRowIndex = visibleRowBoundaries.start;
  const visibleCount = visibleRowBoundaries.end - visibleRowBoundaries.start;
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
