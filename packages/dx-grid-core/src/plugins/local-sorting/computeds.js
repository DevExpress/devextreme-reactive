import mergeSort from '../../utils/merge-sort';

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const sortedRows = (
  rows,
  sorting,
  getCellValue,
  getColumnCompare,
  isGroupRow,
) => {
  if (!sorting.length) return rows;

  const compare = Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) => {
        const { columnName } = columnSorting;
        const inverse = columnSorting.direction === 'desc';
        const columnCompare = (getColumnCompare && getColumnCompare(columnName)) || defaultCompare;

        return (aRow, bRow) => {
          const a = getCellValue(aRow, columnName);
          const b = getCellValue(bRow, columnName);
          const result = columnCompare(a, b);

          if (result !== 0) {
            return inverse ? -result : result;
          }
          return prevCompare(aRow, bRow);
        };
      },
      () => 0,
    );

  if (rows.findIndex(row => isGroupRow(row)) > -1) {
    const arr = rows.reduce((acc, row) => {
      if (isGroupRow(row)) {
        acc.push([]);
      } else {
        if (acc.length) {
          acc[acc.length - 1].push(row);
        }
      }

      return acc;
    }, []);
    const sortedArr = arr.map((items) => {
      if (!items.length) return items;
      return mergeSort(Array.from(items), compare);
    });

    const result = [];
    let groupIndex = 0;
    rows.forEach((row) => {
      if (isGroupRow(row)) {
        result.push(row);
        result.push(...sortedArr[groupIndex]);
        groupIndex += 1;
      }
    });
    return result;
  }

  return mergeSort(Array.from(rows), compare);
};
