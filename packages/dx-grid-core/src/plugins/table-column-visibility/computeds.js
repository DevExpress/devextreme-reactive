export const visibleTableColumns = (tableColumns, hiddenColumnNames) =>
  tableColumns.filter(tableColumn => hiddenColumnNames.indexOf(tableColumn.column.name) === -1);
