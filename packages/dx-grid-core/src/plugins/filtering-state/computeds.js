const toString = value => String(value).toLowerCase();

const applyFilter = (filter, value) => (toString(value).indexOf(toString(filter.value)) > -1);

export const filteredRows = (rows, filters, getCellData, filterFn) => {
  if (!filters.length) return rows;

  return rows.filter(
    row => filters.reduce(
      (accumulator, filter) =>
        accumulator && (
          filterFn ?
            filterFn(row, filter) :
            applyFilter(filter, getCellData(row, filter.columnName))), true));
};
