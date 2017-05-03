const createSortingCompare = (sorting, compareEqual) => (a, b) => {
  const sortColumn = sorting.column;
  const inverse = sorting.direction === 'desc';

  if (a[sortColumn] === b[sortColumn]) {
    return (compareEqual && compareEqual(a, b)) || 0;
  }

  return (a[sortColumn] < b[sortColumn]) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
};

export const sortedRows = (rows, sortings) => {
  if (!sortings.length) { return rows; }

  const compare = sortings.slice()
        .reverse()
        .reduce((prevCompare, sorting) => createSortingCompare(sorting, prevCompare), () => 0);

  return rows.slice().sort(compare);
};
