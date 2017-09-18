import mergeSort from '../../utils/merge-sort';

const createSortingCompare = (sorting, compareEqual, getCellData) => (a, b) => {
  const inverse = sorting.direction === 'desc';
  const { columnName } = sorting;
  const aValue = getCellData(a, columnName);
  const bValue = getCellData(b, columnName);

  if (aValue === bValue) {
    return (compareEqual && compareEqual(a, b)) || 0;
  }

  return (aValue < bValue) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
};

export const sortedRows = (rows, sorting, getCellData) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce((prevCompare, columnSorting) =>
      createSortingCompare(columnSorting, prevCompare, getCellData), () => 0);

  return mergeSort(Array.from(rows), compare);
};
