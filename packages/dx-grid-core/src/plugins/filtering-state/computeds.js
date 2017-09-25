const toLowerCase = value => String(value).toLowerCase();

export const filteredRows = (
  rows,
  filters,
  getCellValue,
  predicate = (value, filter) => toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1,
) => {
  if (!filters.length) return rows;

  return rows.filter(row => filters.reduce(
    (acc, filter) => acc && predicate(getCellValue(row, filter.columnName), filter, row),
    true,
  ));
};
