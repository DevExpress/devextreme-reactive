export const toggleColumn = (hiddenColumns, columnName) => (
  hiddenColumns.indexOf(columnName) === -1
    ? [...hiddenColumns, columnName]
    : hiddenColumns.filter(hiddenColumn => hiddenColumn !== columnName)
);
