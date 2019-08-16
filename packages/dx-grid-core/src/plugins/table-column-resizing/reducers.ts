import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';
import { getColumnsSizes } from './helpers';

export const changeTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, nextColumnResizing } = payload;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const nextIndex = nextColumnWidth.findIndex(elem => elem.columnName === nextColumnName);
  const { size, nextSize } = getColumnsSizes(columnWidths, payload);

  nextColumnWidth.splice(index, 1, { columnName, width: size });
  if (nextColumnResizing) {
    nextColumnWidth.splice(nextIndex, 1, { columnName: nextColumnName, width: nextSize });
  }
  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, nextColumnResizing } = payload;
  const { size, nextSize } = getColumnsSizes(columnWidths, payload);
  let draftColumnWidths = [{ columnName, width: size }];

  if (nextColumnResizing) {
    draftColumnWidths = [...draftColumnWidths, { columnName: nextColumnName, width: nextSize! }];
  }

  return {
    draftColumnWidths,
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
