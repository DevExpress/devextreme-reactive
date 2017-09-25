export const toggleColumn = (hiddenColumnNames, columnName) => (
  hiddenColumnNames.indexOf(columnName) === -1
    ? [...hiddenColumnNames, columnName]
    : hiddenColumnNames.filter(hiddenColumnName => hiddenColumnName !== columnName)
);
