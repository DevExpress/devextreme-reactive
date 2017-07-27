const tableColumnsWithDraftGrouping = (tableColumns, grouping) =>
  tableColumns
  .reduce((acc, tableColumn) => {
    const currentColumn = grouping.find(g => (g.columnName === tableColumn.name));
    if (!currentColumn) {
      acc.push(tableColumn);
    } else if (currentColumn.mode === 'remove' || currentColumn.mode === 'add') {
      acc.push({
        ...tableColumn,
        isDraft: true,
      });
    }
    return acc;
  }, []);

export const tableColumnsWithGrouping = (tableColumns, grouping,
  draftGrouping, groupIndentColumnWidth) => [
    ...grouping.map(group => ({ type: 'groupColumn', group, width: groupIndentColumnWidth })),
    ...tableColumnsWithDraftGrouping(tableColumns, draftGrouping),
  ];
