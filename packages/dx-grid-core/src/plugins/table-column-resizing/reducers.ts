import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';
import { getColumnsSizes } from './helpers';

export const changeTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, columnResizingMode } = payload;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const nextIndex = nextColumnWidth.findIndex(elem => elem.columnName === nextColumnName);
  const { size, nextSize } = getColumnsSizes(columnWidths, payload);

  nextColumnWidth.splice(index, 1, { columnName, width: size });
  if (columnResizingMode === 'nextColumn') {
    nextColumnWidth.splice(nextIndex, 1, { columnName: nextColumnName, width: nextSize });
  }
  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, columnResizingMode } = payload;
  const { size, nextSize } = getColumnsSizes(columnWidths, payload);
  let draftColumnWidths = [{ columnName, width: size }];

  if (columnResizingMode === 'nextColumn') {
    draftColumnWidths = [...draftColumnWidths, { columnName: nextColumnName, width: nextSize! }];
  }

  return {
    draftColumnWidths,
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
