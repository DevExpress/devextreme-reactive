const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

export const filteredRows = (
  rows,
  filters,
  getCellValue,
  getColumnPredicate,
  isGroupRow,
) => {
  if (!filters.length) return rows;
  const compoundPredicate = filters.reduce(
    (prevCompare, filter) => (row) => {
      if (isGroupRow(row)) return true;
      const { columnName, ...filterConfig } = filter;
      const predicate = (getColumnPredicate && getColumnPredicate(columnName)) || defaultPredicate;
      return prevCompare(row) && predicate(getCellValue(row, columnName), filterConfig, row);
    },
    () => true,
  );
  const result = rows.filter(compoundPredicate);
  return result;
};

