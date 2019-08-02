import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer, ColumnSizeFn } from '../../types';

export const getColumnSize: ColumnSizeFn = (
  updatedColumn, {columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
}) => {
  const indexOfExtended = columnExtensions
    ? columnExtensions.findIndex(elem => elem.columnName === columnName)
    : -1;
  const extendedColumn = indexOfExtended >= 0 ? columnExtensions[indexOfExtended] : undefined;
  const haveExtendedMinWidth = extendedColumn && extendedColumn.minWidth >= 0;
  const haveExtendedMaxWidth = extendedColumn && extendedColumn.maxWidth >= 0;
  const minWidth = haveExtendedMinWidth
    ? columnExtensions[indexOfExtended].minWidth
    : minColumnWidth;
  const maxWidth = haveExtendedMaxWidth
    ? columnExtensions[indexOfExtended].maxWidth
    : maxColumnWidth;
  const size = Math.max(
    minWidth,
    Math.min(updatedColumn.width! + shift, maxWidth),
  );
  return size;
};

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
  state, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions },
) => {
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
