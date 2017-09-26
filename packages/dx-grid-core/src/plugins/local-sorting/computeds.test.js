import Immutable from 'seamless-immutable';

import {
  sortedRows,
} from './computeds';

describe('SortingState computeds', () => {
  describe('#sortedRows', () => {
    const rows = [
      { rowData: { a: 2, b: 2 } },
      { rowData: { a: 1, b: 1 } },
      { rowData: { a: 2, b: 1 } },
      { rowData: { a: 1, b: 2 } },
    ];

    const getCellValue = (row, columnName) => row[columnName];

    it('does not mutate rows if no sorting specified', () => {
      const sorting = [];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toBe(rows);
    });

    it('can sort ascending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { rowData: { a: 1, b: 1 } },
        { rowData: { a: 1, b: 2 } },
        { rowData: { a: 2, b: 2 } },
        { rowData: { a: 2, b: 1 } },
      ]);
    });

    it('can sort descending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'desc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { rowData: { a: 2, b: 2 } },
        { rowData: { a: 2, b: 1 } },
        { rowData: { a: 1, b: 1 } },
        { rowData: { a: 1, b: 2 } },
      ]);
    });

    it('can sort by several columns', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { rowData: { a: 1, b: 1 } },
        { rowData: { a: 1, b: 2 } },
        { rowData: { a: 2, b: 1 } },
        { rowData: { a: 2, b: 2 } },
      ]);
    });

    it('can sort by several columns with different directions', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'desc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { rowData: { a: 1, b: 2 } },
        { rowData: { a: 1, b: 1 } },
        { rowData: { a: 2, b: 2 } },
        { rowData: { a: 2, b: 1 } },
      ]);
    });

    it('should work with immutable data', () => {
      const immutableSorting = Immutable([{ columnName: 'a', direction: 'desc' }]);

      const sorted = sortedRows(rows, immutableSorting, getCellValue);
      expect(sorted).toEqual([
        { rowData: { a: 2, b: 2 } },
        { rowData: { a: 2, b: 1 } },
        { rowData: { a: 1, b: 1 } },
        { rowData: { a: 1, b: 2 } },
      ]);
    });
  });
});
