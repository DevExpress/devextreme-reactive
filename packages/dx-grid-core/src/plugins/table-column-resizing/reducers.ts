import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';
import { getColumnSizes } from './helpers';

export const changeTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, resizingMode } = payload;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const nextIndex = nextColumnWidth.findIndex(elem => elem.columnName === nextColumnName);
  const { size, nextSize } = getColumnSizes(columnWidths, payload);

  nextColumnWidth.splice(index, 1, { columnName, width: size });
  if (resizingMode === 'nextColumn') {
    nextColumnWidth.splice(nextIndex, 1, { columnName: nextColumnName, width: nextSize });
  }
  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, resizingMode } = payload;
  const { size, nextSize } = getColumnSizes(columnWidths, payload);

  if (resizingMode === 'nextColumn') {
    return { draftColumnWidths: [
      { columnName, width: size }, { columnName: nextColumnName, width: nextSize! },
    ] };
  }
  return { draftColumnWidths: [{ columnName, width: size }] };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
