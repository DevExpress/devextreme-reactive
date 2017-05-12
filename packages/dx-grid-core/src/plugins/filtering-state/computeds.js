const toString = value => String(value).toLowerCase();

const applyRowFilter = (row, filter) =>
  toString(row[filter.columnName]).indexOf(toString(filter.value)) > -1;

export const filteredRows = (rows, filters, filterFn = applyRowFilter) => {
  if (!filters.length) return rows;

  return rows.filter(
    row => filters.reduce(
      (accumulator, filter) =>
        accumulator && filterFn(row, filter), true));
};
