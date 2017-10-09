const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

export const filteredRows = (
  rows,
  filters,
  getCellValue,
  getColumnPredicate,
) => {
  if (!filters.length) return rows;

  return rows.filter(row => filters.reduce(
    (acc, filter) => {
      const { columnName, ...filterConfig } = filter;
      const predicate = (getColumnPredicate && getColumnPredicate(columnName)) || defaultPredicate;

      return acc && predicate(getCellValue(row, columnName), filterConfig, row);
    },
    true,
  ));
};
