const toLowerCase = value => String(value).toLowerCase();

export const filteredRows = (
  gridRows,
  filters,
  getCellValue,
  predicate = (value, filter) => toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1,
) => {
  if (!filters.length) return gridRows;

  const compoundPredicate = filters.reduce(
    (prevCompare, filter) => row =>
      prevCompare(row) && predicate(getCellValue(row, filter.columnName), filter, row),
    () => true,
  );

  return gridRows.filter(({ row }) => compoundPredicate(row));
};
