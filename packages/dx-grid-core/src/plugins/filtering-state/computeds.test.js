import {
    filteredRows,
} from './computeds';

describe('FilteringState computeds', () => {
  describe('#filteredRows', () => {
    const rows = [
            { a: 1, b: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 1 },
            { a: 2, b: 2 },
    ];

    it('should not touch rows if no filters specified', () => {
      const filters = [];

      const filtered = filteredRows(rows, filters);
      expect(filtered).toBe(rows);
    });

    it('can filter by one field', () => {
      const filters = [{ columnName: 'a', value: 1 }];

      const filtered = filteredRows(rows, filters);
      expect(filtered).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('can filter by several fields', () => {
      const filters = [{ columnName: 'a', value: 1 }, { columnName: 'b', value: 2 }];

      const filtered = filteredRows(rows, filters);
      expect(filtered).toEqual([
        { a: 1, b: 2 },
      ]);
    });
  });
});
