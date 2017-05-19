import {
    expandedDetailRows,
    tableColumnsWithDetail,
} from './computeds';

describe('DetailRow computeds', () => {
  describe('#expandedDetailRows', () => {
    test('can expand one row', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const expandedRows = [2];

      const rowsWithDetails = expandedDetailRows(rows, expandedRows, row => row.id, 'auto');
      expect(rowsWithDetails).toEqual([
        { id: 1 },
        { id: 2 },
        {
          type: 'detailRow',
          id: 2,
          for: { id: 2 },
          colspan: 0,
          height: 'auto',
        },
      ]);
    });

    test('can expand several rows', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const expandedRows = [1, 2];

      const rowsWithDetails = expandedDetailRows(rows, expandedRows, row => row.id, 'auto');
      expect(rowsWithDetails).toEqual([
        { id: 1 },
        {
          type: 'detailRow',
          id: 1,
          for: { id: 1 },
          colspan: 0,
          height: 'auto',
        },
        { id: 2 },
        {
          type: 'detailRow',
          id: 2,
          for: { id: 2 },
          colspan: 0,
          height: 'auto',
        },
      ]);
    });
  });

  describe('#tableColumnsWithDetail', () => {
    const tableColumns = [
      { name: 'a' },
      { name: 'b' },
    ];

    test('should work', () => {
      const columns = tableColumnsWithDetail(tableColumns);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toMatchObject({ type: 'detail', width: 25 });
      expect(columns[1]).toMatchObject({ name: 'a' });
      expect(columns[2]).toMatchObject({ name: 'b' });
    });
  });
});
