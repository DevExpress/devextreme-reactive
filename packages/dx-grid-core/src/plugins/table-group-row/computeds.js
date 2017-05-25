export const tableColumnsWithGroups = (columns, grouping, groupColumnWidth) => [
  ...grouping.map(group => ({ type: 'groupColumn', group, width: groupColumnWidth })),
  ...columns,
];

export const tableColumnsWithoutGroups = (columns, grouping) => columns.filter(column =>
  grouping.findIndex(g => g.columnName === column.name) === -1);
