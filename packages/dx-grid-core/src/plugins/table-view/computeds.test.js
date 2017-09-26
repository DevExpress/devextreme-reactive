import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE, TABLE_UNKNOWN_TYPE } from './constants';
import {
  tableRowsWithDataRows,
  tableColumnsWithDataRows,
} from './computeds';

describe('TableView Plugin computeds', () => {
  describe('#tableColumnsWithDataRows', () => {
    it('should work', () => {
      const columns = [{ name: 'a' }, { name: 'b' }];

      expect(tableColumnsWithDataRows(columns))
        .toEqual([
          { key: `${TABLE_DATA_TYPE}_a`, type: TABLE_DATA_TYPE, column: columns[0] },
          { key: `${TABLE_DATA_TYPE}_b`, type: TABLE_DATA_TYPE, column: columns[1] },
        ]);
    });

    it('should copy width', () => {
      const columns = [{ name: 'a', width: 100 }];

      expect(tableColumnsWithDataRows(columns)[0])
        .toMatchObject({ width: 100 });
    });
  });

  describe('#tableRowsWithDataRows', () => {
    it('should work', () => {
      const rows = [
        { rowData: { id: 1 }, defaultRowId: 0 },
        { rowData: { id: 2 }, defaultRowId: 1 },
      ];
      const getRowId = row => row.rowData.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          {
            key: `${TABLE_DATA_TYPE}_1`,
            type: TABLE_DATA_TYPE,
            rowId: 1,
            rowData: rows[0].rowData,
            row: rows[0],
          },
          {
            key: `${TABLE_DATA_TYPE}_2`,
            type: TABLE_DATA_TYPE,
            rowId: 2,
            rowData: rows[1].rowData,
            row: rows[1],
          },
        ]);
    });

    it('should handle unknown row types', () => {
      const rows = [
        { rowData: 'data', type: 'type' },
        { rowData: { id: 2 } },
        { rowData: 'data', type: 'type' },
      ];
      const getRowId = row => row.rowData.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          {
            key: `${TABLE_UNKNOWN_TYPE}_0`,
            type: TABLE_UNKNOWN_TYPE,
            row: rows[0],
          },
          {
            key: `${TABLE_DATA_TYPE}_2`,
            type: TABLE_DATA_TYPE,
            rowId: 2,
            rowData: rows[1].rowData,
            row: rows[1],
          },
          {
            key: `${TABLE_UNKNOWN_TYPE}_2`,
            type: TABLE_UNKNOWN_TYPE,
            row: rows[2],
          },
        ]);
    });

    it('should add nodata row if rows are empty', () => {
      const rows = [];
      const getRowId = row => row.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          { key: TABLE_NODATA_TYPE, type: TABLE_NODATA_TYPE, colSpanStart: 0 },
        ]);
    });
  });
});
