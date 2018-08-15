export const getFixedColumnKeys = (tableColumns, fixedNames, fixedTypes) => tableColumns
  .filter(tableColumn => (
    (tableColumn.column && fixedNames.indexOf(tableColumn.column.name) !== -1)
    || fixedTypes.indexOf(tableColumn.type) !== -1
  ))
  .map(({ key }) => key);
