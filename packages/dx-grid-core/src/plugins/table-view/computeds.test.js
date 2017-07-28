import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
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
          { type: TABLE_DATA_TYPE, id: 'a', column: columns[0] },
          { type: TABLE_DATA_TYPE, id: 'b', column: columns[1] },
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
      const rows = [{ id: 1 }, { id: 2 }];
      const getRowId = row => row.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          { type: TABLE_DATA_TYPE, id: 1, row: rows[0] },
          { type: TABLE_DATA_TYPE, id: 2, row: rows[1] },
        ]);
    });

    it('should add nodata row if rows are empty', () => {
      const rows = [];
      const getRowId = row => row.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          { type: TABLE_NODATA_TYPE, id: 0, colSpanStart: 0 },
        ]);
    });
  });
});
