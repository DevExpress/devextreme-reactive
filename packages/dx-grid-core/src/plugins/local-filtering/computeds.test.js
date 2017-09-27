import {
  filteredRows,
} from './computeds';

describe('FilteringState computeds', () => {
  describe('#filteredRows', () => {
    const gridRows = [
      { row: { a: 1, b: 1 } },
      { row: { a: 1, b: 2 } },
      { row: { a: 2, b: 1 } },
      { row: { a: 2, b: 2 } },
    ];

    const getCellValue = (row, columnName) => row[columnName];

    it('should not touch grid rows if no filters specified', () => {
      const filters = [];

      const filtered = filteredRows(gridRows, filters, getCellValue);
      expect(filtered).toBe(gridRows);
    });

    it('can filter by one field', () => {
      const filters = [{ columnName: 'a', value: 1 }];

      const filtered = filteredRows(gridRows, filters, getCellValue);
      expect(filtered).toEqual([
        { row: { a: 1, b: 1 } },
        { row: { a: 1, b: 2 } },
      ]);
    });

    it('can filter by several fields', () => {
      const filters = [{ columnName: 'a', value: 1 }, { columnName: 'b', value: 2 }];

      const filtered = filteredRows(gridRows, filters, getCellValue);
      expect(filtered).toEqual([
        { row: { a: 1, b: 2 } },
      ]);
    });
  });
});
