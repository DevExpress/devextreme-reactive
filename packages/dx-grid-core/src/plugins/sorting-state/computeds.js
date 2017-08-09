import mergeSort from '../../utils/merge-sort';
import { getColumnByName } from '../../utils/columns';

const createSortingCompare = (sorting, compareEqual, columns, getCellData) => (a, b) => {
  const inverse = sorting.direction === 'desc';
  const column = getColumnByName(columns, sorting.columnName);
  const aValue = getCellData(a, column);
  const bValue = getCellData(b, column);

  if (aValue === bValue) {
    return (compareEqual && compareEqual(a, b)) || 0;
  }

  return (aValue < bValue) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
};

export const sortedRows = (rows, columns, sorting, getCellData) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce((prevCompare, columnSorting) =>
      createSortingCompare(columnSorting, prevCompare, columns, getCellData), () => 0);

  return mergeSort(Array.from(rows), compare);
};
