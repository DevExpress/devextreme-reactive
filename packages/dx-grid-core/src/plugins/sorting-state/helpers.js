const unique = arr => [...new Set(arr)];

const getPersistentSortedColumns = (sorting, columnExtensions = []) =>
  columnExtensions.reduce((acc, { columnName, sortingEnabled }) => {
    if (sortingEnabled === false) {
      if (sorting.findIndex(sortItem => sortItem.columnName === columnName) > -1) {
        acc.push(columnName);
      }
    }
    return acc;
  }, []);

const calculateKeepOther = (sorting, keepOther, columnExtensions) => {
  const persistentSortedColumns =
    getPersistentSortedColumns(sorting, columnExtensions);
  if (!persistentSortedColumns.length) return keepOther;
  if (!keepOther) return persistentSortedColumns;

  return Array.isArray(keepOther)
    ? unique([...keepOther, ...persistentSortedColumns])
    : unique([...sorting.map(item => item.columnName), ...persistentSortedColumns]);
};

export const getColumnSortingDirection = (sorting, columnName) => {
  const columnSorting = sorting.filter(s => s.columnName === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};

export const getChangeColumnSorting =
  (changeColumnSorting, columnExtensions) =>
    (state, payload) => {
      const keepOther = calculateKeepOther(state.sorting, payload.keepOther, columnExtensions);
      return changeColumnSorting(state, { ...payload, keepOther });
    };
