export const isEmptyMessageShow = (grouping, hiddenColumnNames, columns) => {
  if (grouping === undefined) return false;
  if (columns.length === hiddenColumnNames.length) return true;

  const groupingColumnNames = grouping.map(group => group.columnName);
  const showedColumnNames = columns.reduce((acc, showedColumn) => {
    if (!hiddenColumnNames.find(hiddenColumnName => hiddenColumnName === showedColumn.name)) {
      acc.push(showedColumn.name);
    }
    return acc;
  }, []);

  let showedColumnsGrouped = true;
  showedColumnNames.forEach((showedColumnName) => {
    if (groupingColumnNames.indexOf(showedColumnName) === -1) {
      showedColumnsGrouped = false;
    }
  });
  return showedColumnsGrouped;
};
