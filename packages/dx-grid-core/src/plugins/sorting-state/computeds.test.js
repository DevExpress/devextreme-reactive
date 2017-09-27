import Immutable from 'seamless-immutable';

import {
  sortedRows,
} from './computeds';

describe('SortingState computeds', () => {
  describe('#sortedRows', () => {
    const rows = [
      { a: 2, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 1 },
      { a: 1, b: 2 },
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
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ]);
    });

    it('can sort descending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'desc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('can sort by several columns', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
      ]);
    });

    it('can sort by several columns with different directions', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'desc' }];

      const sorted = sortedRows(rows, sorting, getCellValue);
      expect(sorted).toEqual([
        { a: 1, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ]);
    });

    it('should work with immutable data', () => {
      const immutableRows = Immutable(rows);
      const immutableSorting = Immutable([{ columnName: 'a', direction: 'desc' }]);

      const sorted = sortedRows(immutableRows, immutableSorting, getCellValue);
      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('can sort using custom comparer', () => {
      const comparer = jest.fn();

      comparer.mockImplementation(() => (a, b) => {
        const sum1 = a.a + a.b;
        const sum2 = b.a + b.b;
        if (sum1 === sum2) {
          return 0;
        }
        return sum1 < sum2 ? 1 : -1;
      });

      const sorting = [{ columnName: 'a', direction: 'desc' }];
      const sorted = sortedRows(rows, sorting, getCellValue, comparer);

      expect(comparer).toBeCalledWith(sorting[0]);
      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 2 },
        { a: 1, b: 1 },
      ]);
    });

    it('should use default comparer if custom comparer returns nothing', () => {
      const comparer = () => undefined;
      const sorting = [{ columnName: 'a', direction: 'desc' }];
      const sorted = sortedRows(rows, sorting, getCellValue, comparer);

      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });
  });
});
