const mergeWithUnique = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

export const getColumnSortingDirection = (sorting, columnName) => {
  const columnSorting = sorting.filter(s => s.columnName === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};

export const getPersistentSortedColumns = (sorting, columnExtensions = []) =>
  columnExtensions.reduce((acc, { columnName, sortingEnabled }) => {
    if (sortingEnabled === false) {
      if (sorting.findIndex(sortItem => sortItem.columnName === columnName) > -1) {
        acc.push(columnName);
      }
    }
    return acc;
  }, []);

export const culculateKeepOther = (sorting, keepOther, persistentSortedColumns = []) => {
  if (!persistentSortedColumns.length) return keepOther;
  if (!keepOther) return persistentSortedColumns;

  return Array.isArray(keepOther)
    ? mergeWithUnique(keepOther, persistentSortedColumns)
    : mergeWithUnique(sorting.map(item => item.columnName), persistentSortedColumns);
};
