import { TABLE_BAND_TYPE } from './constants';

export const tableRowsWithBands = (tableHeaderRows, columnGroups, tableColumns) => {
  let maxLevel = 0;
  const tableDataColumns = tableColumns.filter(column => column.type === 'data');

  const maxNestedLevel = (bands, level) => {
    bands.forEach((column) => {
      if (column.children !== undefined) {
        maxNestedLevel(column.children, level + 1);
      } if (level > maxLevel && tableDataColumns.findIndex(dataColumn =>
        dataColumn.column.name === column.columnName) > -1) {
        maxLevel = level;
      }
    });
  };
  maxNestedLevel(columnGroups, 0);

  const tableGroupHeaders = Array.from({ length: maxLevel })
    .map((_, index) => ({ key: `${TABLE_BAND_TYPE}_${index}`, type: TABLE_BAND_TYPE, level: index }));
  return [...tableGroupHeaders, ...tableHeaderRows];
};
