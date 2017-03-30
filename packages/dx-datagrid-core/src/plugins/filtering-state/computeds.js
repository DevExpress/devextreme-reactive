export const filteredRows = (rows, filters) => {
  if (!filters.length) { return rows; }

  const toString = value => String(value).toLowerCase();

  return rows.filter(
    row => filters.reduce(
      (accumulator, filter) =>
        accumulator && toString(row[filter.column]).indexOf(toString(filter.value)) > -1, true));
};
