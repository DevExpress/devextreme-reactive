const tableColumnsWithVisualGrouping = (columns, grouping) => columns.reduce((acc, column) => {
  const currentColumn = grouping.find(g => (g.columnName === column.name));
  if (!currentColumn) {
    acc.push(column);
  } else if (currentColumn.mode === 'remove' || currentColumn.mode === 'add') {
    acc.push({
      ...column,
      isDraft: true,
    });
  }
  return acc;
}, []);

export const tableColumnsWithGrouping = (columns, grouping,
  visualGrouping, groupIndentColumnWidth) => [
    ...grouping.map(group => ({ type: 'groupColumn', group, width: groupIndentColumnWidth })),
    ...tableColumnsWithVisualGrouping(columns, visualGrouping),
  ];
