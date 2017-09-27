import mergeSort from '../../utils/merge-sort';

const createSortingCompare = (sorting, compareEqual, getCellValue) => {
  const { columnName, direction } = sorting;
  const inverse = direction === 'desc';

  return (a, b) => {
    const aValue = getCellValue(a.row, columnName);
    const bValue = getCellValue(b.row, columnName);

    if (aValue === bValue) {
      return compareEqual(a, b);
    }

    return (aValue < bValue) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
  };
};

export const sortedRows = (gridRows, sorting, getCellValue) => {
  if (!sorting.length) return gridRows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) =>
        createSortingCompare(columnSorting, prevCompare, getCellValue),
      () => 0,
    );

  return mergeSort(gridRows, compare);
};
