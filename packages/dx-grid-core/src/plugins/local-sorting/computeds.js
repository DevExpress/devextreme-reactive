import mergeSort from '../../utils/merge-sort';

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const createCompare = (sorting, getColumnCompare, getCellValue) =>
  Array.from(sorting)
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

const sortRows = (rows, compare, isGroupRow) => {
  const lastIndex = rows.length - 1;

  return rows.reduce((acc, row, index) => {
    const { boundaries, sorted } = acc;
    const currentRowIsGroup = isGroupRow ? isGroupRow(row) : false;

    if (index === 0) {
      boundaries.push(currentRowIsGroup ? 1 : 0);
      if (currentRowIsGroup) {
        sorted.push(row);
      }
    } else if (index === lastIndex) {
      boundaries.push(currentRowIsGroup ? index : undefined);
    } else if (currentRowIsGroup) {
      boundaries.push(index);
    }

    if (boundaries.length === 2) {
      const from = boundaries[0];
      const to = boundaries[1];
      const sotredSection = mergeSort(rows.slice(from, to), compare);

      sorted.push(...sotredSection);
      if (to && isGroupRow(rows[to])) {
        sorted.push(rows[to]);
      }

      // ? boundaries.splice(0, 2, to + 1);
      boundaries.splice(0, 1);
      boundaries[0] += 1;
    }

    return acc;
  }, { boundaries: [], sorted: [] }).sorted;
};

export const sortedRows = (
  rows,
  sorting,
  getCellValue,
  getColumnCompare,
  isGroupRow,
) => {
  if (!sorting.length) return rows;
  const compare = createCompare(sorting, getColumnCompare, getCellValue);
  return sortRows(Array.from(rows), compare, isGroupRow);
};
