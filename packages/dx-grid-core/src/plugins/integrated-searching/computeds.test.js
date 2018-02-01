import { searchCells } from './computeds';

const getCellValue = (row, columnName) => row[columnName];

describe('Search computeds', () => {
  const rows = [
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 1 },
    { a: 2, b: 2 },
  ];
  const columns = [{ name: 'a' }, { name: 'b' }];

  it('should return rows with search value', () => {
    const searchValue = 1;
    const searched = searchCells(rows, columns, getCellValue, searchValue);
    expect(searched).toEqual([
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
    ]);
  });

  it('should return all original rows', () => {
    const searchValue = '';
    const searched = searchCells(rows, columns, getCellValue, searchValue);
    expect(searched).toEqual(rows);
  });

  it('should search using custom predicate', () => {
    const getColumnPredicate = jest.fn();

    getColumnPredicate
      .mockImplementation(() => (value, filter, row) => value === 1 && row.b === 2);

    const searchValue = 1;
    const searched = searchCells(rows, columns, getCellValue, searchValue, getColumnPredicate);

    expect(getColumnPredicate).toBeCalledWith(columns[0].name);
    expect(searched)
      .toEqual([
        { a: 1, b: 2 },
      ]);
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

    it('should search grouped rows', () => {
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
      const searchValue = '1';
      const searched = searchCells(
        groupedRows,
        columns,
        getCellValue,
        searchValue,
        null,
        isGroupRow,
        getRowLevelKey,
      );

      expect(searched).toEqual([
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
      ]);
    });
  });
});
