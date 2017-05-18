export const setColumnSorting = (sorting, { columnName, direction, keepOther, remove }) => {
  const sortingIndex = sorting.findIndex(s => s.columnName === columnName);
  const columnSorting = sorting[sortingIndex];
  const nextSorting = keepOther ? sorting.slice() : [];

  if (columnSorting) {
    const updatedSorting = {
      ...columnSorting,
      direction: columnSorting.direction === 'asc' ? 'desc' : 'asc',
    };
    if (keepOther && remove) {
      nextSorting.splice(sortingIndex, 1);
    } else if (keepOther && !remove) {
      nextSorting.splice(sortingIndex, 1, updatedSorting);
    } else if (!keepOther && remove) {
      nextSorting.length = 0;
    } else {
      nextSorting.push(updatedSorting);
    }
  } else if (!remove) {
    nextSorting.push({
      columnName,
      direction: direction || 'asc',
    });
  }

  return nextSorting;
};
