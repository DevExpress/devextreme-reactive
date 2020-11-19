// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import { sortedRows } from './computeds';
import { Sorting } from '../../types';

describe('IntegratedSorting computeds', () => {
  describe('#sortedRows', () => {
    const getCellValue = (row, columnName) => row[columnName];

    describe('plain rows', () => {
      const rows = [
        { a: 2, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 1 },
        { a: 1, b: 2 },
      ];

      it('does not mutate grid rows if no sorting specified', () => {
        const sorting: ReadonlyArray<Sorting> = [];

        const sorted = sortedRows(rows, sorting, getCellValue);
        expect(sorted).toBe(rows);
      });

      it('should work with immutable properties', () => {
        const sorting = Immutable([{ columnName: 'a', direction: 'asc' }]);

        expect(() => sortedRows(rows, sorting, getCellValue)).not.toThrow();
      });

      it('can sort ascending by one column', () => {
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'a', direction: 'asc' }];

        const sorted = sortedRows(rows, sorting, getCellValue);
        expect(sorted).toEqual([
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          { a: 2, b: 2 },
          { a: 2, b: 1 },
        ]);
      });

      it('can sort descending by one column', () => {
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'a', direction: 'desc' }];

        const sorted = sortedRows(rows, sorting, getCellValue);
        expect(sorted).toEqual([
          { a: 2, b: 2 },
          { a: 2, b: 1 },
          { a: 1, b: 1 },
          { a: 1, b: 2 },
        ]);
      });

      it('can sort by several columns', () => {
        const sorting: ReadonlyArray<Sorting> = [
          { columnName: 'a', direction: 'asc' },
          { columnName: 'b', direction: 'asc' },
        ];

        const sorted = sortedRows(rows, sorting, getCellValue);
        expect(sorted).toEqual([
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          { a: 2, b: 1 },
          { a: 2, b: 2 },
        ]);
      });

      it('can sort by several columns with different directions', () => {
        const sorting: ReadonlyArray<Sorting> = [
          { columnName: 'a', direction: 'asc' },
          { columnName: 'b', direction: 'desc' },
        ];

        const sorted = sortedRows(rows, sorting, getCellValue);
        expect(sorted).toEqual([
          { a: 1, b: 2 },
          { a: 1, b: 1 },
          { a: 2, b: 2 },
          { a: 2, b: 1 },
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
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'a', direction: 'desc' }];
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
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'a', direction: 'desc' }];
        const sorted = sortedRows(rows, sorting, getCellValue, getColumnCompare);

        expect(sorted).toEqual([
          { a: 2, b: 2 },
          { a: 2, b: 1 },
          { a: 1, b: 1 },
          { a: 1, b: 2 },
        ]);
      });

      it('should correctly sort column with \'undefined\' values', () => {
        const spacedRows = [
          { a: 1 },
          { a: 2, b: 1 },
          { a: 3, b: 2 },
          { a: 4 },
        ];
        const getColumnCompare = () => undefined;
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'b', direction: 'asc' }];
        const sorted = sortedRows(spacedRows, sorting, getCellValue, getColumnCompare);

        expect(sorted).toEqual([
          { a: 2, b: 1 },
          { a: 3, b: 2 },
          { a: 1 },
          { a: 4 },
        ]);
      });

      it('should correctly sort column with \'null\' values', () => {
        const spacedRows = [
          { a: 1, b: null },
          { a: 2, b: 1 },
          { a: 3, b: 2 },
          { a: 4, b: null },
        ];
        const getColumnCompare = () => undefined;
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'b', direction: 'asc' }];
        const sorted = sortedRows(spacedRows, sorting, getCellValue, getColumnCompare);

        expect(sorted).toEqual([
          { a: 2, b: 1 },
          { a: 3, b: 2 },
          { a: 1, b: null },
          { a: 4, b: null },
        ]);
      });

      it('should correctly sort column with \'null\' and \'undefined\' values', () => {
        const spacedRows = [
          { a: 1, b: null },
          { a: 2, b: 1 },
          { a: 3, b: undefined },
          { a: 4, b: 0 },
          { a: 5, b: 2 },
          { a: 6, b: null },
        ];
        const getColumnCompare = () => undefined;
        const sorting: ReadonlyArray<Sorting> = [{ columnName: 'b', direction: 'asc' }];
        const sorted = sortedRows(spacedRows, sorting, getCellValue, getColumnCompare);

        expect(sorted).toEqual([
          { a: 4, b: 0 },
          { a: 2, b: 1 },
          { a: 5, b: 2 },
          { a: 1, b: null },
          { a: 6, b: null },
          { a: 3, b: undefined },
        ]);
      });
    });

    describe('grouped rows', () => {
      const groupRow = ({ groupedBy, ...restParams }) => ({
        ...restParams,
        groupedBy,
        group: true,
        levelKey: groupedBy,
      });
      const isGroupRow = row => row.group;
      const getRowLevelKey = row => row.levelKey;

      it('should sort grouped rows', () => {
        /* tslint:disable ter-indent align */
        const groupedRows = [
          groupRow({ groupedBy: 'a', value: 1 }),
            groupRow({ groupedBy: 'b', value: 1 }),
            groupRow({ groupedBy: 'b', value: 2 }),
              { c: 1 },
              { c: 2 },
          groupRow({ groupedBy: 'a', value: 2 }),
        ];
        /* tslint:enable ter-indent align */
        const sorting: ReadonlyArray<Sorting> = [
          { columnName: 'a', direction: 'desc' },
          { columnName: 'b', direction: 'desc' },
          { columnName: 'c', direction: 'desc' },
        ];
        /* tslint:disable ter-indent align */
        const sortedGroupedRows = [
          groupRow({ groupedBy: 'a', value: 2 }),
          groupRow({ groupedBy: 'a', value: 1 }),
            groupRow({ groupedBy: 'b', value: 2 }),
              { c: 2 },
              { c: 1 },
            groupRow({ groupedBy: 'b', value: 1 }),
        ];
        /* tslint:enable ter-indent align */

        expect(sortedRows(
          groupedRows,
          sorting,
          getCellValue,
          () => undefined,
          isGroupRow,
          getRowLevelKey,
        ))
          .toEqual(sortedGroupedRows);
      });
    });

    describe('hierarchical rows', () => {
      const rowNode = ({ level, ...restParams }) => ({
        ...restParams,
        levelKey: `tree_${level}`,
      });
      const getRowLevelKey = row => row.levelKey;

      it('should sort grouped rows', () => {
        /* tslint:disable ter-indent align */
        const hierarchicalRows = [
          rowNode({ level: 0, a: 1 }),
            rowNode({ level: 1, b: 1 }),
            rowNode({ level: 1, b: 2 }),
              { c: 1 },
              { c: 2 },
          rowNode({ level: 0, a: 2 }),
        ];
        /* tslint:enable ter-indent align */
        const sorting: ReadonlyArray<Sorting> = [
          { columnName: 'a', direction: 'desc' },
          { columnName: 'b', direction: 'desc' },
          { columnName: 'c', direction: 'desc' },
        ];
        /* tslint:disable ter-indent align */
        const sortedHierarchicalRows = [
          rowNode({ level: 0, a: 2 }),
          rowNode({ level: 0, a: 1 }),
            rowNode({ level: 1, b: 2 }),
              { c: 2 },
              { c: 1 },
            rowNode({ level: 1, b: 1 }),
        ];
        /* tslint:enable ter-indent align */

        expect(sortedRows(
          hierarchicalRows,
          sorting,
          getCellValue,
          () => undefined,
          undefined,
          getRowLevelKey,
        ))
          .toEqual(sortedHierarchicalRows);
      });
    });
  });
});
