export const setColumnSorting = (state, {
  columnName, direction, keepOther, sortIndex,
}) => {
  const { sorting } = state;

  let nextSorting = [];
  if (keepOther === true) {
    nextSorting = sorting.slice();
  }
  if (Array.isArray(keepOther)) {
    nextSorting = sorting.slice()
      .filter(columnSorting => keepOther.indexOf(columnSorting.columnName) > -1);
  }

  const columnSortingIndex = sorting
    .findIndex(columnSorting => columnSorting.columnName === columnName);
  const columnSorting = sorting[columnSortingIndex];
  const newColumnSorting = {
    columnName,
    direction: direction ||
      (!columnSorting || columnSorting.direction === 'desc' ? 'asc' : 'desc'),
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
