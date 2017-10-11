export const columnChooserItems = (columns, hiddenColumns) =>
  columns.map(column => ({ column, hidden: hiddenColumns.indexOf(column.name) !== -1 }));
