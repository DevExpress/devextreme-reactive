import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const tableRowsWithBands = (tableHeaderRows, columnBands, tableColumns) => {
  const tableDataColumns = tableColumns.filter(column => column.type === TABLE_DATA_TYPE);
  const getMaxNestedLevel = (bands, level = 0, result = null) => bands.reduce((acc, column) => {
    if (column.children !== undefined) {
      return getMaxNestedLevel(column.children, level + 1, acc);
    }
    const isDataColumn = tableDataColumns.findIndex(
      dataColumn => dataColumn.column.name === column.columnName,
    ) > -1;
    if (level > acc.level && isDataColumn) {
      acc.level = level;
      return acc;
    }
    return acc;
  }, result || { level: 0 });

  const tableBandHeaders = Array.from({ length: getMaxNestedLevel(columnBands, 0).level })
    .map((row, index) => ({ key: `${TABLE_BAND_TYPE.toString()}_${index}`, type: TABLE_BAND_TYPE, level: index }));
  return [...tableBandHeaders, ...tableHeaderRows];
};
