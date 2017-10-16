export const getColumnSortingDirection = (sorting, columnName) => {
  const columnSorting = sorting.filter(s => s.columnName === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};

export const getHeaderRowScope = (tableColumns, TABLE_DATA_TYPE) => (
  tableColumns
    .filter(tableColumn => tableColumn.type === TABLE_DATA_TYPE)
    .map(tableColumn => tableColumn.column.name)
);
