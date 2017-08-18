export const draftGrouping = (grouping, groupingChange) => {
  if (!groupingChange) return grouping;

  const { columnName, groupIndex } = groupingChange;
  let result = Array.from(grouping);

  if (groupIndex !== -1) {
    result = result.filter(g => g.columnName !== columnName);
    result.splice(groupIndex, 0, {
      columnName,
      draft: true,
      mode: grouping.length > result.length ? 'reorder' : 'add',
    });
  } else {
    result = result.map(g => (g.columnName === columnName
      ? { columnName, draft: true, mode: 'remove' }
      : g));
  }

  return result;
};
