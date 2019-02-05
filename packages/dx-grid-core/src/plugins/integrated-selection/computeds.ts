import { PureComputed } from '@devexpress/dx-core';
import {
  RowsWithSelection, UnwrapRowsComputed, RowId, RowsWithAvailableToSelectFn,
} from '../../types';

type RowsSelectedFn = PureComputed<[RowsWithSelection, RowId[]], boolean>;

export const rowsWithAvailableToSelect: RowsWithAvailableToSelectFn = (
  rows, getRowId, isGroupRow,
) => {
  let dataRows = rows;
  if (isGroupRow) {
    dataRows = dataRows.filter(row => !isGroupRow(row));
  }
  return { rows, availableToSelect: dataRows.map(row => getRowId(row)) };
};

export const someSelected: RowsSelectedFn = ({ availableToSelect }, selection) => {
  const selectionSet = new Set(selection);

  return availableToSelect.length !== 0 && selectionSet.size !== 0
    && availableToSelect.some(elem => selectionSet.has(elem))
    && availableToSelect.some(elem => !selectionSet.has(elem));
};

export const allSelected: RowsSelectedFn = ({ availableToSelect }, selection) => {
  const selectionSet = new Set(selection);

  return selectionSet.size !== 0 && availableToSelect.length !== 0
    && !availableToSelect.some(elem => !selectionSet.has(elem));
};

export const unwrapSelectedRows: UnwrapRowsComputed = ({ rows }) => rows;
