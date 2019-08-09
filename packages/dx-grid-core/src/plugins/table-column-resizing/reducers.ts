import { slice } from '@devexpress/dx-core';
import { ColumnWidthReducer } from '../../types';
import { getColumnSize } from './helpers';

export const changeTableColumnWidth: ColumnWidthReducer = (
  state, { columnName, nextColumnName, nextColumnResizing,
  shift, cachedWidths, minColumnWidth, maxColumnWidth, columnExtensions,
}) => {
  const { columnWidths } = state;
  const nextColumnWidth = slice(columnWidths);
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const nextIndex = nextColumnWidth.findIndex(elem => elem.columnName === nextColumnName);
  const updatedColumn = nextColumnWidth[index];
  const nextUpdatedColumn = nextColumnResizing
    ? nextColumnWidth[nextIndex]
    : undefined;

  // const updatedWidth = typeof updatedColumn.width === 'number'
  //   ? updatedColumn.width
  //   : cachedWidths[columnName];
  // const nextUpdatedWidth = nextColumnResizing
  //   ? typeof nextUpdatedColumn.width === 'number'
  //     ? nextUpdatedColumn.width
  //     : cachedWidths[nextColumnName]
  //   : undefined;
  // let size = Math.max(minColumnWidth, updatedWidth + shift);
  // let nextSize = nextColumnResizing
  //   ? Math.max(minColumnWidth, nextUpdatedWidth - shift)
  //   : nextUpdatedWidth;
  // if (nextColumnResizing && size + nextSize > updatedWidth + nextUpdatedWidth) {
  //   size = size === minColumnWidth ? size : updatedWidth + nextUpdatedWidth - nextSize ;
  //   nextSize = nextSize === minColumnWidth ? nextSize : updatedWidth + nextUpdatedWidth - size ;
  // }

  const size = getColumnSize(
    updatedColumn, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
    });

  nextColumnWidth.splice(index, 1, { columnName, width: size });
  if (nextColumnResizing) {
    nextColumnWidth.splice(nextIndex, 1, { columnName: nextColumnName, width: nextSize });
  }
  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth: ColumnWidthReducer = (
  state, { columnName,nextColumnName, nextColumnResizing,cachedWidths, shift, minColumnWidth, maxColumnWidth, columnExtensions,
}) => {
  const { columnWidths } = state;
  const updatedColumn = columnWidths.find(elem => elem.columnName === columnName)!;
  const nextUpdatedColumn = columnWidths.find(elem => elem.columnName === nextColumnName)!;
  // const updatedWidth = typeof updatedColumn.width === 'number'
  //   ? updatedColumn.width
  //   : cachedWidths[columnName];
  // const nextUpdatedWidth = nextColumnResizing
  //   ? typeof nextUpdatedColumn.width === 'number'
  //     ? nextUpdatedColumn.width
  //     : cachedWidths[nextColumnName]
  //   : undefined;
  // let size = Math.max(minColumnWidth, updatedWidth + shift);
  // let nextSize = nextColumnResizing
  //   ? Math.max(minColumnWidth, nextUpdatedWidth! - shift)
  //   : nextUpdatedWidth;
  const size = getColumnSize(
    updatedColumn, { columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions,
    });

  // if (nextColumnResizing && size + nextSize! > updatedWidth + nextUpdatedWidth!) {
  //   size = size <= minColumnWidth ? size : updatedWidth + nextUpdatedWidth! - nextSize! ;
  //   nextSize = nextSize! <= minColumnWidth ? nextSize : updatedWidth + nextUpdatedWidth! - size ;
  // }
  // if (nextColumnResizing) {
  //   return {
  //     draftColumnWidths: [
  //       { columnName, width: size },
  //       { columnName: nextColumnName, width: nextSize! },
  //     ],
  //   };
  // }
  return {
    draftColumnWidths: [
      { columnName, width: size },
    ],
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
