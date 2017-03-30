export const getColumnSortingDirection = (sortings, columnName) => {
  const sorting = sortings.filter(s => s.column === columnName)[0];
  return sorting ? sorting.direction : false;
};
