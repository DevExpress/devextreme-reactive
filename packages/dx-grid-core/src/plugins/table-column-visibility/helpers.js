export const showEmptyMessage = (grouping, hiddenColumns, columns) => {
  if (columns.length === hiddenColumns.length) return true;

  const showColumnNames = columns.reduce((acc, column) => {
    if (!hiddenColumns.find(hiddenColumn => hiddenColumn === column.name)) {
      acc.push(column.name);
    }
    return acc;
  }, []);


  // const groupingNames = grouping.map(group => group.columnName);
  // const condition = (a, b) => {
  //   if (a == b) return true;
  //   for (var i in a) {
  //     if (b.find(elem => elem !== a[i])) return false;
  //   }
  //   // a.forEach((firstName) => {
  //   //   if (b.find(secondName => firstName !== secondName)) return false;
  //   //   // return true;
  //   // });
  //   return true;
  // };
  // const resultCond = condition(showColumnNames, groupingNames);
  // debugger;
};
