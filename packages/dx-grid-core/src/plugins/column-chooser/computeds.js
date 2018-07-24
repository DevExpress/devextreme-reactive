export const columnChooserItems = (columns, hiddenColumnNames) => columns.map(column => ({
  column,
  hidden: hiddenColumnNames.indexOf(column.name) !== -1,
}));
