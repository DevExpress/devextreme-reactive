const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

export const filteredGridRows = (
  gridRows,
  filters,
  getCellValue,
  getColumnPredicate,
) => {
  if (!filters.length) return gridRows;

  const compoundPredicate = filters.reduce(
    (prevCompare, filter) => (row) => {
      const { columnName, ...filterConfig } = filter;
      const predicate = (getColumnPredicate && getColumnPredicate(columnName)) || defaultPredicate;

      return prevCompare(row) && predicate(getCellValue(row, columnName), filterConfig, row);
    },
    () => true,
  );

  return gridRows.filter(({ row }) => compoundPredicate(row));
};

