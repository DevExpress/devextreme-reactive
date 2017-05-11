export const getColumnSortingDirection = (sorting, columnName) => {
  const columnSorting = sorting.filter(s => s.columnName === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};
