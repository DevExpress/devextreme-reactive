export const showEmptyMessage = (grouping, hiddenColumns, columns) => {
  if (columns.length === hiddenColumns.length) return true;
  if (grouping === undefined) return false;

  let contain = true;
  const groupingNames = grouping.map(group => group.columnName);
  const showedColumnNames = columns.reduce((acc, column) => {
    if (!hiddenColumns.find(hiddenColumn => hiddenColumn === column.name)) {
      acc.push(column.name);
    }
    return acc;
  }, []);

  showedColumnNames.forEach((element) => {
    if (groupingNames.indexOf(element) === -1) {
      contain = false;
    }
  });
  return contain;
};
