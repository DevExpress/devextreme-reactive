export const groupingPanelItems = (columns, grouping) =>
  grouping.map(({ columnName, draft, mode }) => {
    const column = columns.find(c => c.name === columnName);
    return {
      column,
      draft,
      mode,
    };
  });
