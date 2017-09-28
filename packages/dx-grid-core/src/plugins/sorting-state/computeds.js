import mergeSort from '../../utils/merge-sort';

const defaultComparer = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const sortedRows = (rows, sorting, getCellValue, getColumnComparer) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) => {
        const { columnName } = columnSorting;
        const inverse = columnSorting.direction === 'desc';
        const comparer = (getColumnComparer && getColumnComparer(columnName)) || defaultComparer;

        return (aRow, bRow) => {
          const a = getCellValue(aRow, columnName);
          const b = getCellValue(bRow, columnName);
          const result = comparer(a, b);

          if (result === 0) {
            return prevCompare(aRow, bRow);
          }
          return (result === -1) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
        };
      },
      () => 0,
    );

  return mergeSort(Array.from(rows), compare);
};
