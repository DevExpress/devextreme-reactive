export const groupedColumns = (columns, grouping) =>
  grouping.map(({ columnName, isDraft }) => {
    const column = columns.find(c => c.name === columnName);
    return isDraft ? {
      ...column,
      isDraft,
    } : column;
  });
