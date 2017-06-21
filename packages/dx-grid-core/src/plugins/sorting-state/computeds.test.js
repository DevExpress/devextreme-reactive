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

    it('does not mutate rows if no sorting specified', () => {
      const sorting = [];

      const sorted = sortedRows(rows, sorting);
      expect(sorted).toBe(rows);
    });

    it('can sort ascending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }];

      const sorted = sortedRows(rows, sorting);
      expect(sorted).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ]);
    });

    it('can sort descending by one column', () => {
      const sorting = [{ columnName: 'a', direction: 'desc' }];

      const sorted = sortedRows(rows, sorting);
      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('can sort by several columns', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }];

      const sorted = sortedRows(rows, sorting);
      expect(sorted).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
      ]);
    });

    it('can sort by several columns with different directions', () => {
      const sorting = [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'desc' }];

      const sorted = sortedRows(rows, sorting);
      expect(sorted).toEqual([
        { a: 1, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ]);
    });
  });
});
