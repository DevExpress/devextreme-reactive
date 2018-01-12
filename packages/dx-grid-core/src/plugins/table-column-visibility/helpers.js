import { TABLE_DATA_TYPE, GRID_GROUP_TYPE } from '@devexpress/dx-core';

export const isEmptyMessageShow = (grouping, tableColumns) => {
  if (grouping === undefined) return false;
  const visibleTableColumns = tableColumns.reduce((acc, column) => {
    if (column.type === TABLE_DATA_TYPE || column.type === GRID_GROUP_TYPE) {
      acc.push(column.column.name);
    } return acc;
  }, []);
  if (visibleTableColumns.length === 0) return true;

  const groupingColumnNames = grouping.map(group => group.columnName);
  let visibleColumnsGrouped = true;
  visibleTableColumns.forEach((visibleColumnName) => {
    if (groupingColumnNames.indexOf(visibleColumnName) === -1) {
      visibleColumnsGrouped = false;
    }
  });
  return visibleColumnsGrouped;
};
