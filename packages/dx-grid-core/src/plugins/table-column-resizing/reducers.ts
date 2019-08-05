import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';

export const changeTableColumnWidth: ColumnWidthReducer = (
  state, { columnName, shift, width, minColumnWidth ,
}) => {
  const { columnWidths } = state;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const size = Math.max(minColumnWidth, width + shift);
  nextColumnWidth.splice(index, 1, { columnName, width: size });

  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (
  state, { columnName, shift, width, minColumnWidth,
}) => {
  // const { columnWidths } = state;
  // const updatedColumn = columnWidths.find(elem => elem.columnName === columnName)!;
  const size = Math.max(minColumnWidth, width + shift);

  return {
    draftColumnWidths: [{ columnName, width: size }],
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
