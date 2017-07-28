import { TABLE_DETAIL_TYPE } from './constants';
import {
  tableRowsWithExpandedDetail,
  tableColumnsWithDetail,
} from './computeds';

describe('TableRowDetail Plugin computeds', () => {
  describe('#tableRowsWithExpandedDetail', () => {
    it('can expand one row', () => {
      const tableRows = [{ type: 'data', id: 1, row: 'row1' }, { type: 'data', id: 2, row: 'row2' }];
      const expandedRows = [2];

      const rowsWithDetails = tableRowsWithExpandedDetail(tableRows, expandedRows, 'auto');
      expect(rowsWithDetails).toEqual([
        { type: 'data', id: 1, row: 'row1' },
        { type: 'data', id: 2, row: 'row2' },
        {
          type: TABLE_DETAIL_TYPE,
          id: 2,
          row: 'row2',
          colSpanStart: 0,
          height: 'auto',
        },
      ]);
    });

    it('can\'t expand not data', () => {
      const tableRows = [{ type: 'data', id: 1, row: 'row1' }, { type: 'undefined', id: 2, row: 'row2' }];
      const expandedRows = [2];

      const rowsWithDetails = tableRowsWithExpandedDetail(tableRows, expandedRows, 'auto');
      expect(rowsWithDetails).toEqual([
        { type: 'data', id: 1, row: 'row1' },
        { type: 'undefined', id: 2, row: 'row2' },
      ]);
    });

    it('can expand several rows', () => {
      const tableRows = [{ type: 'data', id: 1, row: 'row1' }, { type: 'data', id: 2, row: 'row2' }];
      const expandedRows = [1, 2];

      const rowsWithDetails = tableRowsWithExpandedDetail(tableRows, expandedRows, 'auto');
      expect(rowsWithDetails).toEqual([
        { type: 'data', id: 1, row: 'row1' },
        {
          type: TABLE_DETAIL_TYPE,
          id: 1,
          row: 'row1',
          colSpanStart: 0,
          height: 'auto',
        },
        { type: 'data', id: 2, row: 'row2' },
        {
          type: TABLE_DETAIL_TYPE,
          id: 2,
          row: 'row2',
          colSpanStart: 0,
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
