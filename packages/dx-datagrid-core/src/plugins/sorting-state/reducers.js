export const setColumnSorting = (sortings, { columnName, direction, keepOther }) => {
  const sortingIndex = sortings.findIndex(s => s.column === columnName);
  const sorting = sortings[sortingIndex];
  const nextSortings = keepOther ? sortings.slice() : [];

  if (sorting) {
    const nextSorting = Object.assign({}, sorting, { direction: sorting.direction === 'asc' ? 'desc' : 'asc' });
    if (keepOther) {
      nextSortings.splice(sortingIndex, 1, nextSorting);
    } else {
      nextSortings.push(nextSorting);
    }
  } else {
    nextSortings.push({
      column: columnName,
      direction: direction || 'asc',
    });
  }

  return nextSortings;
};
