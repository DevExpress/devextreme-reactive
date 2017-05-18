export const ungroupedColumns = (columns, grouping) => [
  ...columns.filter(column =>
  grouping.findIndex(g => g.columnName === column.name) === -1),
];
