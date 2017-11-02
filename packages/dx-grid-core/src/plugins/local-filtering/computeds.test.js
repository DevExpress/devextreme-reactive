import {
  filteredRows,
} from './computeds';

describe('LocalFiltering computeds', () => {
  describe('#filteredRows', () => {
    const rows = [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 },
    ];

    const getCellValue = (row, columnName) => row[columnName];

    it('should not touch rows if no filters specified', () => {
      const filters = [];

      const filtered = filteredRows(rows, filters, getCellValue);
      expect(filtered).toBe(rows);
    });

    it('can filter by one field', () => {
      const filters = [{ columnName: 'a', value: 1 }];

      const filtered = filteredRows(rows, filters, getCellValue);
      expect(filtered).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('can filter by several fields', () => {
      const filters = [{ columnName: 'a', value: 1 }, { columnName: 'b', value: 2 }];

      const filtered = filteredRows(rows, filters, getCellValue);
      expect(filtered).toEqual([
        { a: 1, b: 2 },
      ]);
    });

    it('can filter using custom predicate', () => {
      const getColumnPredicate = jest.fn();

      getColumnPredicate
        .mockImplementation(() => (value, filter, row) => value === 1 && row.b === 2);

      const filters = [{ columnName: 'a', value: 1 }];
      const filtered = filteredRows(rows, filters, getCellValue, getColumnPredicate);

      expect(getColumnPredicate).toBeCalledWith(filters[0].columnName);
      expect(filtered)
        .toEqual([
          { a: 1, b: 2 },
        ]);
    });

    it('should filter using default predicate if custom predicate returns nothing', () => {
      const getColumnPredicate = () => undefined;
      const filters = [{ columnName: 'a', value: 1 }];
      const filtered = filteredRows(rows, filters, getCellValue, getColumnPredicate);

      expect(filtered)
        .toEqual([
          { a: 1, b: 1 },
          { a: 1, b: 2 },
        ]);
    });

    it('should filter grouped rows', () => {
      const filters = [{ columnName: 'a', value: 1 }];
      const isGroupRow = row => row.group;
      const groupedRows = [
        {
          group: true,
          groupLevelKey: 'a',
          collapsedItems: [
            { a: 1, b: 1 },
            { a: 2, b: 2 },
          ],
        },
        { group: true, groupLevelKey: 'a', collapsedItems: [] },
        { group: true, groupLevelKey: 'b', collapsedItems: [] },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { group: true, groupLevelKey: 'a', collapsedItems: [] },
        { group: true, groupLevelKey: 'b', collapsedItems: [] },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
      ];

      const filtered = filteredRows(
        groupedRows,
        filters,
        getCellValue,
        () => undefined,
        isGroupRow,
        row => row.groupLevelKey,
      );
      expect(filtered).toEqual([
        {
          group: true,
          groupLevelKey: 'a',
          collapsedItems: [
            { a: 1, b: 1 },
          ],
        },
        { group: true, groupLevelKey: 'a', collapsedItems: [] },
        { group: true, groupLevelKey: 'b', collapsedItems: [] },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
      expect(filtered[0].collapsedItems).not.toBe(groupedRows[0].collapsedItems);
    });
  });
});
