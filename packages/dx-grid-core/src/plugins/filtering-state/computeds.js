const toString = value => String(value).toLowerCase();

const applyFilter = (filter, value) => (toString(value).indexOf(toString(filter.value)) > -1);

export const filteredRows = (rows, filters, getCellData, userFilterFn) => {
  if (!filters.length) return rows;

  const filterFn = userFilterFn ||
    ((row, filter) => applyFilter(filter, getCellData(row, filter.columnName)));

  return rows.filter(row => filters.reduce((accumulator, filter) =>
    accumulator && filterFn(row, filter), true));
};
