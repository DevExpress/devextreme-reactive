import { TABLE_DETAIL_TYPE } from './constants';
import {
  tableRowsWithExpandedDetail,
  tableColumnsWithDetail,
} from './computeds';

describe('TableRowDetail Plugin computeds', () => {
  describe('#tableRowsWithExpandedDetail', () => {
    it('can expand one row', () => {
      const rows = [{ row: { id: 1 } }, { row: { id: 2 } }];
      const expandedRows = [2];

      const rowsWithDetails = tableRowsWithExpandedDetail(rows, expandedRows, row => row.id, 'auto');
      expect(rowsWithDetails).toEqual([
        { row: { id: 1 } },
        { row: { id: 2 } },
        {
          type: TABLE_DETAIL_TYPE,
          id: 2,
          row: { id: 2 },
          colspan: 0,
          height: 'auto',
        },
      ]);
    });

    it('can expand several rows', () => {
      const rows = [{ row: { id: 1 } }, { row: { id: 2 } }];
      const expandedRows = [1, 2];

      const rowsWithDetails = tableRowsWithExpandedDetail(rows, expandedRows, row => row.id, 'auto');
      expect(rowsWithDetails).toEqual([
        { row: { id: 1 } },
        {
          type: TABLE_DETAIL_TYPE,
          id: 1,
          row: { id: 1 },
          colspan: 0,
          height: 'auto',
        },
        { row: { id: 2 } },
        {
          type: TABLE_DETAIL_TYPE,
          id: 2,
          row: { id: 2 },
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

    it('should work', () => {
      const columns = tableColumnsWithDetail(tableColumns, 50);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toMatchObject({ type: TABLE_DETAIL_TYPE, width: 50 });
      expect(columns[1]).toBe(tableColumns[0]);
      expect(columns[2]).toBe(tableColumns[1]);
    });
  });
});
