import mergeSort from '../../utils/merge-sort';

const createSortingCompare = (sorting, compareEqual, getCellValue) => (a, b) => {
  const inverse = sorting.direction === 'desc';
  const { columnName } = sorting;
  const aValue = getCellValue(a, columnName);
  const bValue = getCellValue(b, columnName);

  if (aValue === bValue) {
    return (compareEqual && compareEqual(a, b)) || 0;
  }

  return (aValue < bValue) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
};

export const sortedRows = (rows, sorting, getCellValue, comparer) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) => {
        const defaultComparer = createSortingCompare(columnSorting, prevCompare, getCellValue);
        if (comparer) {
          const sortingFn = comparer(columnSorting);
          if (sortingFn) {
            return sortingFn;
          }
          return defaultComparer;
        }
        return defaultComparer;
      },
      () => 0,
    );

  return mergeSort(Array.from(rows), compare);
};
