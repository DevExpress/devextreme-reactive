import { Getters } from '@devexpress/dx-react-core';
import {
  getRowsVisibleBoundary,
} from '../../utils/virtual-table';
import { RowsVisibleBoundaryFn } from '../../types';
import { pageTriggersMeta } from './helpers';

export const getVisibleRowsBounds: RowsVisibleBoundaryFn = (
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

  let referenceIndex: number | null = null;
  if (referencePosition < topTriggerPosition) {
    referenceIndex = getReferenceIndex(topTriggerIndex, topTriggerPosition);
  }
  if (bottomTriggerPosition < referencePosition) {
    referenceIndex = getReferenceIndex(bottomTriggerIndex, bottomTriggerPosition);
  }

  return referenceIndex;
};
