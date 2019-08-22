import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';
import { getColumnSize } from './helpers';

export const changeTableColumnWidth: ColumnWidthReducer = (
  state, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
}) => {
  const { columnWidths } = state;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const updatedColumn = nextColumnWidth[index];
  const size = getColumnSize(
    updatedColumn, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
    });
  nextColumnWidth.splice(index, 1, { columnName, width: size });
  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (
  state, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
}) => {
  const { columnWidths } = state;
  const updatedColumn = columnWidths.find(elem => elem.columnName === columnName)!;
  const size = getColumnSize(
    updatedColumn, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
    });
  return {
    draftColumnWidths: [{ columnName: updatedColumn.columnName, width: size }],
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
