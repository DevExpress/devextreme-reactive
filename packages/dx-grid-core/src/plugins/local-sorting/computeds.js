import mergeSort from '../../utils/merge-sort';

const createSortingCompare = (sorting, compareEqual, getCellValue) => {
  const { columnName, direction } = sorting;
  const inverse = direction === 'desc';

  return (a, b) => {
    const aValue = getCellValue(a.rowData, columnName);
    const bValue = getCellValue(b.rowData, columnName);

    if (aValue === bValue) {
      return compareEqual(a, b);
    }

    return (aValue < bValue) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
  };
};

export const sortedRows = (rows, sorting, getCellValue) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) =>
        createSortingCompare(columnSorting, prevCompare, getCellValue),
      (a, b) => a.defaultRowId < b.defaultRowId,
    );

  return mergeSort(rows, compare);
};
