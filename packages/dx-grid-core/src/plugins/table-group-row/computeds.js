export const tableColumnsWithGroups = (columns, grouping) => [
  ...grouping.map(group => ({ type: 'groupColumn', group, width: 20 })),
  ...columns,
];
