import { getColumnByName } from '../../utils/columns';

const toString = value => String(value).toLowerCase();

const applyRowFilter = (row, filter, columns, getCellData) => {
  const column = getColumnByName(columns, filter.columnName);
  const value = getCellData(row, column);

  return toString(value).indexOf(toString(filter.value)) > -1;
};

export const filteredRows = (rows, filters, columns, getCellData, filterFn = applyRowFilter) => {
  if (!filters.length) return rows;

  return rows.filter(
    row => filters.reduce(
      (accumulator, filter) =>
        accumulator && filterFn(row, filter, columns, getCellData), true));
};
