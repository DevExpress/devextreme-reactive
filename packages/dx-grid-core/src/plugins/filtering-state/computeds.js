const toString = value => String(value).toLowerCase();

const applyRowFilter = (row, filter, getCellData) => {
  const value = getCellData(row, filter.columnName);

  return toString(value).indexOf(toString(filter.value)) > -1;
};

export const filteredRows = (rows, filters, getCellData, filterFn = applyRowFilter) => {
  if (!filters.length) return rows;

  return rows.filter(
    row => filters.reduce(
      (accumulator, filter) =>
        accumulator && filterFn(row, filter, getCellData), true));
};
