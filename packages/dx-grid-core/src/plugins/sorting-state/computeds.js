import mergeSort from '../../utils/merge-sort';

const createSortingCompare = (sorting, compareEqual) => (a, b) => {
  const sortColumn = sorting.columnName;
  const inverse = sorting.direction === 'desc';

  if (a[sortColumn] === b[sortColumn]) {
    return (compareEqual && compareEqual(a, b)) || 0;
  }

  return (a[sortColumn] < b[sortColumn]) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
};

export const sortedRows = (rows, sorting) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce((prevCompare, columnSorting) =>
      createSortingCompare(columnSorting, prevCompare), () => 0);

  return mergeSort(Array.from(rows), compare);
};
