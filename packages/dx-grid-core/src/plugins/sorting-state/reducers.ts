import { ColumnSortingState, ChangeSortingPayload } from '../../types';
import { PureReducer } from '@devexpress/dx-core';

export const changeColumnSorting: PureReducer<ColumnSortingState, ChangeSortingPayload> = (
  state, {
  columnName, direction, keepOther, sortIndex,
}) => {
  const { sorting } = state;

  let nextSorting: any[] = [];
  if (keepOther === true) {
    nextSorting = Array.prototype.slice.call(sorting);
  }
  if (Array.isArray(keepOther)) {
    nextSorting = Array.prototype.slice.call(sorting)
      .filter(s =>
        keepOther.indexOf(s.columnName) > -1);
  }

  const columnSortingIndex = sorting.findIndex(s => s.columnName === columnName);
  const columnSorting = sorting[columnSortingIndex];
  const newColumnSorting = {
    columnName,
    direction: direction
      || (!columnSorting || columnSorting.direction === 'desc' ? 'asc' : 'desc'),
  };

  if (columnSortingIndex > -1) {
    nextSorting.splice(columnSortingIndex, 1);
  }

  if (direction !== null) {
    const newIndexFallback = columnSortingIndex > -1 ? columnSortingIndex : nextSorting.length;
    const newIndex = sortIndex !== undefined ? sortIndex : newIndexFallback;
    nextSorting.splice(newIndex, 0, newColumnSorting);
  }

  return {
    sorting: nextSorting,
  };
};
