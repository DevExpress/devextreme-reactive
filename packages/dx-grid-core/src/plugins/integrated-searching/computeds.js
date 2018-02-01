import { filteredRows } from '../integrated-filtering/computeds';

export const searchCells = (
  rows,
  columns,
  getCellValue,
  searchValue,
  getColumnPredicate,
  isGroupRow,
  getRowLevelKey,
) => {
  const filters = columns.map(({ name }) => ({
    columnName: name,
    value: searchValue,
  }));

  return filteredRows(
    rows,
    filters,
    getCellValue,
    getColumnPredicate,
    isGroupRow,
    getRowLevelKey,
    true,
  );
};

