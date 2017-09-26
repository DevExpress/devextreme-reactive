const toLowerCase = value => String(value).toLowerCase();

export const filteredRows = (
  rows,
  filters,
  getCellValue,
  predicate = (value, filter) => toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1,
) => {
  if (!filters.length) return rows;

  const compoundPredicate = filters.reduce(
    (prevCompare, filter) => rowData =>
      prevCompare(rowData) && predicate(getCellValue(rowData, filter.columnName), filter, rowData),
    () => true,
  );

  return rows.filter(({ rowData }) => compoundPredicate(rowData));
};
