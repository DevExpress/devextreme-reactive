import Immutable from 'seamless-immutable';

import {
  sortedGridRows,
} from './computeds';

describe('SortingState computeds', () => {
  describe('#sortedGridRows', () => {
    const gridRows = [
      { row: { a: 2, b: 2 }, defaultRowId: 0 },
      { row: { a: 1, b: 1 }, defaultRowId: 1 },
      { row: { a: 2, b: 1 }, defaultRowId: 2 },
      { row: { a: 1, b: 2 }, defaultRowId: 3 },
    ];

    const getCellValue = (row, columnName) => row[columnName];

    it('does not mutate grid rows if no sorting specified', () => {
      const sorting = [];

      const sorted = sortedGridRows(gridRows, sorting, getCellValue);
      expect(sorted).toBe(gridRows);
    });

    it('can sort ascending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }];

      const sorted = sortedGridRows(gridRows, sorting, getCellValue);
      expect(sorted).toEqual([
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
      ]);
    });

    it('can sort descending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'desc' }];

      const sorted = sortedGridRows(gridRows, sorting, getCellValue);
      expect(sorted).toEqual([
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
      ]);
    });

    it('can sort by several columns', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }];

      const sorted = sortedGridRows(gridRows, sorting, getCellValue);
      expect(sorted).toEqual([
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
      ]);
    });

    it('can sort by several columns with different directions', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'desc' }];

      const sorted = sortedGridRows(gridRows, sorting, getCellValue);
      expect(sorted).toEqual([
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
      ]);
    });

    it('should work with immutable data', () => {
      const immutableRows = Immutable(gridRows);
      const immutableSorting = Immutable([{ columnName: 'a', direction: 'desc' }]);

      const sorted = sortedGridRows(immutableRows, immutableSorting, getCellValue);
      expect(sorted).toEqual([
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
      ]);
    });

    it('should work with immutable data', () => {
      const immutableSorting = Immutable([{ columnName: 'a', direction: 'desc' }]);

      const sorted = sortedGridRows(gridRows, immutableSorting, getCellValue);
      expect(sorted).toEqual([
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
      ]);
    });

    it('can sort using custom compare', () => {
      const getColumnCompare = jest.fn();

      getColumnCompare.mockImplementation(() => (a, b) => {
        if (a === b) {
          return 0;
        }
        return a < b ? 1 : -1;
      });
      const sorting = [{ columnName: 'a', direction: 'desc' }];
      const sorted = sortedGridRows(gridRows, sorting, getCellValue, getColumnCompare);

      expect(getColumnCompare).toBeCalledWith(sorting[0].columnName);
      expect(sorted).toEqual([
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
      ]);
    });

    it('should use default compare if custom compare returns nothing', () => {
      const getColumnCompare = () => undefined;
      const sorting = [{ columnName: 'a', direction: 'desc' }];
      const sorted = sortedGridRows(gridRows, sorting, getCellValue, getColumnCompare);

      expect(sorted).toEqual([
        { row: { a: 2, b: 2 }, defaultRowId: 0 },
        { row: { a: 2, b: 1 }, defaultRowId: 2 },
        { row: { a: 1, b: 1 }, defaultRowId: 1 },
        { row: { a: 1, b: 2 }, defaultRowId: 3 },
      ]);
    });
  });
});
