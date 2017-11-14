export const groupingPanelItems = (columns, grouping) =>
  grouping.map(({
    columnName,
    dndProp,
  }) => {
    const column = columns.find(c => c.name === columnName);
    return {
      column,
      dndProp,
    };
  });
