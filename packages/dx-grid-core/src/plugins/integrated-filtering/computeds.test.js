import {
  filteredRows,
  filteredCollapsedRowsGetter,
  unwrappedFilteredRows,
} from './computeds';

describe('IntegratedFiltering computeds', () => {
  describe('#filteredRows', () => {
    const getCellValue = (row, columnName) => row[columnName];

    describe('plain rows', () => {
      const rows = [
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
      ];

      it('should not touch rows if no filters specified', () => {
        const filters = [];

        const filtered = filteredRows(rows, filters, getCellValue);
        expect(filtered).toEqual({ rows });
      });

      it('can filter by one field', () => {
        const filters = [{ columnName: 'a', value: 1 }];

        const filtered = filteredRows(rows, filters, getCellValue);
        expect(filtered)
          .toEqual({
            rows: [
              { a: 1, b: 1 },
              { a: 1, b: 2 },
            ],
          });
      });

      it('can filter by several fields', () => {
        const filters = [{ columnName: 'a', value: 1 }, { columnName: 'b', value: 2 }];

        const filtered = filteredRows(rows, filters, getCellValue);
        expect(filtered)
          .toEqual({
            rows: [
              { a: 1, b: 2 },
            ],
          });
      });

      it('can filter using custom predicate', () => {
        const getColumnPredicate = jest.fn();

        getColumnPredicate
          .mockImplementation(() => (value, filter, row) => value === 1 && row.b === 2);

        const filters = [{ columnName: 'a', value: 1 }];
        const filtered = filteredRows(rows, filters, getCellValue, getColumnPredicate);

        expect(getColumnPredicate).toBeCalledWith(filters[0].columnName);
        expect(filtered)
          .toEqual({
            rows: [
              { a: 1, b: 2 },
            ],
          });
      });

      it('should filter using default predicate if custom predicate returns nothing', () => {
        const getColumnPredicate = () => undefined;
        const filters = [{ columnName: 'a', value: 1 }];
        const filtered = filteredRows(rows, filters, getCellValue, getColumnPredicate);

        expect(filtered)
          .toEqual({
            rows: [
              { a: 1, b: 1 },
              { a: 1, b: 2 },
            ],
          });
      });
    });

    describe('grouped rows', () => {
      const groupRow = ({ groupedBy, ...restParams }) => ({
        ...restParams,
        groupedBy,
        levelKey: groupedBy,
      });
      const getRowLevelKey = row => row.levelKey;
      const getCollapsedRows = row => row.collapsedRows;

      it('should filter grouped rows', () => {
        /* eslint-disable indent */
        const groupedRows = [
          groupRow({ groupedBy: 'a', collapsedRows: [{ a: 1, b: 1 }, { a: 2, b: 2 }] }),
          groupRow({ groupedBy: 'a' }),
            groupRow({ groupedBy: 'b' }),
              { a: 1, b: 1 },
              { a: 1, b: 2 },
          groupRow({ groupedBy: 'a' }),
            groupRow({ groupedBy: 'b' }),
              { a: 2, b: 1 },
              { a: 2, b: 2 },
        ];
        /* eslint-enable indent */
        const filters = [{ columnName: 'a', value: 1 }];
        /* eslint-disable indent */
        const filteredGroupedRows = {
          rows: [
            groupRow({ groupedBy: 'a', collapsedRows: [{ a: 1, b: 1 }, { a: 2, b: 2 }] }),
            groupRow({ groupedBy: 'a' }),
              groupRow({ groupedBy: 'b' }),
                { a: 1, b: 1 },
                { a: 1, b: 2 },
          ],
          collapsedRowsMeta: new Map([
            [groupRow({ groupedBy: 'a', collapsedRows: [{ a: 1, b: 1 }, { a: 2, b: 2 }] }), [{ a: 1, b: 1 }]],
          ]),
        };
        /* eslint-enable indent */

        expect(filteredRows(
          groupedRows,
          filters,
          getCellValue,
          null,
          getRowLevelKey,
          getCollapsedRows,
        ))
          .toEqual(filteredGroupedRows);
      });
    });

    describe('hierarchical rows', () => {
      const rowNode = ({ level, ...restParams }) => ({
        ...restParams,
        levelKey: `tree_${level}`,
      });
      const getRowLevelKey = row => row.levelKey;
      const getCollapsedRows = row => row.collapsedRows;

      it('should sort tree rows', () => {
        /* eslint-disable indent */
        const hierarchicalRows = [
          rowNode({ level: 0, collapsedRows: [{ a: 1, b: 1 }, { a: 2, b: 2 }] }),
          rowNode({ level: 0 }),
            rowNode({ level: 1 }),
              { a: 1, b: 1 },
              { a: 1, b: 2 },
            rowNode({ level: 1, a: 1, collapsedRows: [{ a: 2, b: 2 }] }),
            rowNode({ level: 1, a: 1 }),
              { a: 2, b: 1 },
              { a: 2, b: 2 },
          rowNode({ level: 0 }),
            rowNode({ level: 1 }),
              { a: 2, b: 1 },
              { a: 2, b: 2 },
        ];
        /* eslint-enabke indent */
        const filters = [{ columnName: 'a', value: 1 }];
        /* eslint-disable indent */
        const sortedGroupedRows = {
          rows: [
            rowNode({ level: 0, collapsedRows: [{ a: 1, b: 1 }, { a: 2, b: 2 }] }),
            rowNode({ level: 0 }),
              rowNode({ level: 1 }),
                { a: 1, b: 1 },
                { a: 1, b: 2 },
              rowNode({ level: 1, a: 1, collapsedRows: [{ a: 2, b: 2 }] }),
              rowNode({ level: 1, a: 1 }),
          ],
          collapsedRowsMeta: new Map([
            [
              rowNode({ level: 0, collapsedRows: [{ a: 1, b: 1 }, { a: 2, b: 2 }] }),
              [{ a: 1, b: 1 }],
            ],
            [rowNode({ level: 1, a: 1, collapsedRows: [{ a: 2, b: 2 }] }), []],
            [rowNode({ level: 1, a: 1 }), []],
          ]),
        };
        /* eslint-enable indent */

        expect(filteredRows(
          hierarchicalRows,
          filters,
          getCellValue,
          () => undefined,
          getRowLevelKey,
          getCollapsedRows,
        ))
          .toEqual(sortedGroupedRows);
      });
    });
  });

  describe('#filteredCollapsedRowsGetter', () => {
    it('should not crash without collapsed rows', () => {
      expect(filteredCollapsedRowsGetter({})({}))
        .toBe(undefined);
    });

    it('should provide collapsed rows', () => {
      const collapsedRowsMeta = new Map([[1, ['test']]]);

      expect(filteredCollapsedRowsGetter({ collapsedRowsMeta })(1))
        .toEqual(['test']);
    });
  });

  describe('#unwrappedFilteredRows', () => {
    it('should provide unwrapped rows', () => {
      const rows = [];

      expect(unwrappedFilteredRows({ rows }))
        .toBe(rows);
    });
  });
});
