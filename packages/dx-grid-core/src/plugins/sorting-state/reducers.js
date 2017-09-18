export const setColumnSorting = (sorting, {
  columnName, direction, keepOther, cancel, scope,
}) => {
  const sortingIndex = sorting.findIndex(s => s.columnName === columnName);
  const columnSorting = sorting[sortingIndex];
  let nextSorting = keepOther ? sorting.slice() : [];

  if (scope) {
    nextSorting = [
      ...nextSorting,
      ...sorting.filter(sort =>
        scope.indexOf(sort.columnName) === -1 &&
        sort.columnName !== columnName),
    ];
  }

  if (columnSorting) {
    const updatedSorting = {
      ...columnSorting,
      direction: columnSorting.direction === 'asc' ? 'desc' : 'asc',
    };
    if (keepOther && cancel) {
      nextSorting.splice(sortingIndex, 1);
    } else if (keepOther && !cancel) {
      nextSorting.splice(sortingIndex, 1, updatedSorting);
    } else if (!keepOther && cancel) {
      nextSorting.length = 0;
    } else {
      nextSorting.push(updatedSorting);
    }
  } else if (!cancel) {
    nextSorting.push({
      columnName,
      direction: direction || 'asc',
    });
  }

  return nextSorting;
};
