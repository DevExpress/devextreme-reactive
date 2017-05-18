export const tableColumns = (columns, grouping) => [
  ...grouping.map(group => ({ type: 'groupColumn', group, width: 20 })),
  ...columns,
];
