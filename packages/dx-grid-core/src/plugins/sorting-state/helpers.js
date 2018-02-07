export const getColumnSortingDirection = (sorting, columnName) => {
  const columnSorting = sorting.filter(s => s.columnName === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};

export const calculatePersistentSorting = (sorting, columnExtensions = []) =>
  columnExtensions.reduce((acc, { columnName, sortingEnabled }) => {
    if (sortingEnabled === false) {
      if (sorting.findIndex(sortItem => sortItem.columnName === columnName) > -1) {
        acc.push(columnName);
      }
    }
    return acc;
  }, []);
