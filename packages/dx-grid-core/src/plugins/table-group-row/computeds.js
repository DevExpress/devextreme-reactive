export const tableColumnsWithGroups = (columns, grouping) => [
  ...grouping.map(group => ({ type: 'groupColumn', group, width: 20 })),
  ...columns,
];

export const tableColumnsWithoutGroups = (columns, grouping) => columns.filter(column =>
  grouping.findIndex(g => g.columnName === column.name) === -1);
