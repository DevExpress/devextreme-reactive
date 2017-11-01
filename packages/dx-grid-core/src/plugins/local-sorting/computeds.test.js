import Immutable from 'seamless-immutable';

import {
  sortedRows,
} from './computeds';

describe('LocalSorting computeds', () => {
  describe('#sortedRows', () => {
    const rows = [
      { a: 2, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 1 },
      { a: 1, b: 2 },
    ];

    const getCellValue = (row, columnName) => row[columnName];

    it('does not mutate grid rows if no sorting specified', () => {
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

    it('should work with immutable data', () => {
      const immutableSorting = Immutable([{ columnName: 'a', direction: 'desc' }]);

      const sorted = sortedRows(rows, immutableSorting, getCellValue);
      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
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
      const sorted = sortedRows(rows, sorting, getCellValue, getColumnCompare);

      expect(getColumnCompare).toBeCalledWith(sorting[0].columnName);
      expect(sorted).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ]);
    });

    it('should use default compare if custom compare returns nothing', () => {
      const getColumnCompare = () => undefined;
      const sorting = [{ columnName: 'a', direction: 'desc' }];
      const sorted = sortedRows(rows, sorting, getCellValue, getColumnCompare);

      expect(sorted).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('should sort grouped rows', () => {
      const groupedRows = [
        {
          grouped: true,
          groupLevelKey: 'group_a',
          groupedBy: 'a',
          value: 1,
        },
        {
          grouped: true,
          groupLevelKey: 'group_b',
          groupedBy: 'b',
          value: 1,
        },
        {
          grouped: true,
          groupLevelKey: 'group_b',
          groupedBy: 'b',
          value: 2,
        },
        { c: 1 },
        { c: 2 },
        {
          grouped: true,
          groupLevelKey: 'group_a',
          groupedBy: 'a',
          value: 2,
        },
      ];
      const sorting = [
        { columnName: 'a', direction: 'desc' },
        { columnName: 'b', direction: 'desc' },
        { columnName: 'c', direction: 'desc' },
      ];
      const sotred = sortedRows(
        groupedRows,
        sorting,
        getCellValue,
        () => undefined,
        row => row.grouped === true,
        row => row.groupLevelKey,
      );

      expect(sotred)
        .toEqual([
          {
            grouped: true,
            groupLevelKey: 'group_a',
            groupedBy: 'a',
            value: 2,
          },
          {
            grouped: true,
            groupLevelKey: 'group_a',
            groupedBy: 'a',
            value: 1,
          },
          {
            grouped: true,
            groupLevelKey: 'group_b',
            groupedBy: 'b',
            value: 2,
          },
          { c: 2 },
          { c: 1 },
          {
            grouped: true,
            groupLevelKey: 'group_b',
            groupedBy: 'b',
            value: 1,
          },
        ]);
    });
    it('should not throw an exception if rows are empty', () => {
      expect(sortedRows(
        [],
        [],
        getCellValue,
        () => undefined,
        () => {},
        () => {},
      )).toEqual([]);
    });
  });
});
