export const getColumnSortingDirection = (sorting, columnName) => {
  const columnSorting = sorting.filter(s => s.column === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};
