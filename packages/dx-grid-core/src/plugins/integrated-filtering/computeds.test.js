import { filteredRows } from './computeds';

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
        expect(filtered).toBe(rows);
      });

      it('can filter by one field', () => {
        const filters = [{ columnName: 'a', value: 1 }];

        const filtered = filteredRows(rows, filters, getCellValue);
        expect(filtered)
          .toEqual([
            { a: 1, b: 1 },
            { a: 1, b: 2 },
          ]);
      });

      it('can filter by several fields', () => {
        const filters = [{ columnName: 'a', value: 1 }, { columnName: 'b', value: 2 }];

        const filtered = filteredRows(rows, filters, getCellValue);
        expect(filtered)
          .toEqual([
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

      it('should filter grouped rows', () => {
        const groupedRows = [
          groupRow({
            groupedBy: 'a',
            collapsedRows: [
              { a: 1, b: 1 },
              { a: 2, b: 2 },
            ],
          }),
          groupRow({
            groupedBy: 'a',
          }),
          groupRow({
            groupedBy: 'b',
          }),
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          groupRow({
            groupedBy: 'a',
          }),
          groupRow({
            groupedBy: 'b',
          }),
          { a: 2, b: 1 },
          { a: 2, b: 2 },
        ];
        const filters = [{ columnName: 'a', value: 1 }];

        const filtered = filteredRows(
          groupedRows,
          filters,
          getCellValue,
          null,
          isGroupRow,
          getRowLevelKey,
        );
        expect(filtered)
          .toEqual([
            groupRow({
              groupedBy: 'a',
              collapsedRows: [
                { a: 1, b: 1 },
                { a: 2, b: 2 },
              ],
            }),
            groupRow({
              groupedBy: 'a',
            }),
            groupRow({
              groupedBy: 'b',
            }),
            { a: 1, b: 1 },
            { a: 1, b: 2 },
          ]);
      });
    });
  });
});
