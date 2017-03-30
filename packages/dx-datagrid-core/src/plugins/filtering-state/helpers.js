export const getColumnFilterValue = (filters, columnName) => {
  if (!filters.length) { return ''; }

  const filter = filters.filter(s => s.column === columnName)[0];
  return filter ? filter.value : '';
};
