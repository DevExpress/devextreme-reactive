export const visibleTableColumns = (tableColumns, hiddenColumns) =>
  tableColumns.filter(tableColumn => hiddenColumns.indexOf(tableColumn.column.name) === -1);
