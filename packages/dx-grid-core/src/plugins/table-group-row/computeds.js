export const tableColumnsWithGroups = (columns, grouping, groupIndentColumnWidth) => [
  ...grouping.map(group => ({ type: 'groupColumn', group, width: groupIndentColumnWidth })),
  ...columns,
];

export const tableColumnsWithoutGroups = (columns, grouping) => columns.filter(column =>
  grouping.findIndex(g => g.columnName === column.name) === -1);
