export const groupByColumn = (prevGrouping, { columnName, groupIndex }) => {
  const grouping = prevGrouping.slice();
  const index = grouping.findIndex(g => g.column === columnName);
  let targetIndex = groupIndex;

  if (index > -1) {
    grouping.splice(index, 1);
  } else if (groupIndex === undefined) {
    targetIndex = grouping.length;
  }

  if (targetIndex > -1) {
    grouping.splice(targetIndex, 0, {
      column: columnName,
    });
  }

  return grouping;
};
