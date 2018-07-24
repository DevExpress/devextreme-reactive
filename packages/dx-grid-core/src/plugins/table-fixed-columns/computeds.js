export const fixedColumnKeys = (
  tableColumns, beforeColumnNames, afterColumnNames,
) => [...beforeColumnNames, ...afterColumnNames]
  .map(columnName => tableColumns
    .filter(tableColumn => tableColumn.column.name === columnName)[0].key);
