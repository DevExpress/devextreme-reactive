import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';
import { getColumnSize } from './helpers';

export const changeTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, nextColumnResizing } = payload;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const nextIndex = nextColumnWidth.findIndex(elem => elem.columnName === nextColumnName);
  const size = getColumnSize(columnWidths, payload);

  nextColumnWidth.splice(index, 1, { columnName, width: size[0] });
  if (nextColumnResizing) {
    nextColumnWidth.splice(nextIndex, 1, { columnName: nextColumnName, width: size[1] });
  }
  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (state, payload) => {
  const { columnWidths } = state;
  const { columnName, nextColumnName, nextColumnResizing } = payload;
  const size = getColumnSize(columnWidths, payload);
  let draftColumnWidths = [{ columnName, width: size[0] }];

  if (nextColumnResizing) {
    draftColumnWidths = [...draftColumnWidths, { columnName: nextColumnName, width: size[1] }];
  }
  // console.log(draftColumnWidths);

  return {
    draftColumnWidths,
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
