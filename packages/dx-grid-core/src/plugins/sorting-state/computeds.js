import mergeSort from '../../utils/merge-sort';

const createSortingComparer = (sorting, compareEqual, getCellValue) => (a, b) => {
  const inverse = sorting.direction === 'desc';
  const { columnName } = sorting;
  const aValue = getCellValue(a, columnName);
  const bValue = getCellValue(b, columnName);

  if (aValue === bValue) {
    return (compareEqual && compareEqual(a, b)) || 0;
  }

  return (aValue < bValue) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
};

export const sortedRows = (rows, sorting, getCellValue, sortingComparer) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) => {
        if (sortingComparer) {
          const comparer = sortingComparer(columnSorting);
          return comparer || createSortingComparer(columnSorting, prevCompare, getCellValue);
        }
        return createSortingComparer(columnSorting, prevCompare, getCellValue);
      },
      () => 0,
    );

  return mergeSort(Array.from(rows), compare);
};
