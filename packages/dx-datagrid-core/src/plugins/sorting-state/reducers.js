export const setColumnSorting = (sorting, { columnName, direction, keepOther }) => {
  const sortingIndex = sorting.findIndex(s => s.column === columnName);
  const columnSorting = sorting[sortingIndex];
  const nextSorting = keepOther ? sorting.slice() : [];

  if (columnSorting) {
    const updatedSorting = {
      ...columnSorting,
      direction: columnSorting.direction === 'asc' ? 'desc' : 'asc',
    };
    if (keepOther) {
      nextSorting.splice(sortingIndex, 1, updatedSorting);
    } else {
      nextSorting.push(updatedSorting);
    }
  } else {
    nextSorting.push({
      column: columnName,
      direction: direction || 'asc',
    });
  }

  return nextSorting;
};
