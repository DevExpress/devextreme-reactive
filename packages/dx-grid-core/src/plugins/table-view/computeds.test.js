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
      const gridRows = [
        { row: { id: 1 }, defaultRowId: 0 },
        { row: { id: 2 }, defaultRowId: 1 },
      ];
      const getGridRowId = gridRow => gridRow.row.id;

      expect(tableRowsWithDataRows(gridRows, getGridRowId))
        .toEqual([
          {
            key: `${TABLE_DATA_TYPE}_1`,
            type: TABLE_DATA_TYPE,
            rowId: 1,
            row: gridRows[0].row,
            gridRow: gridRows[0],
          },
          {
            key: `${TABLE_DATA_TYPE}_2`,
            type: TABLE_DATA_TYPE,
            rowId: 2,
            row: gridRows[1].row,
            gridRow: gridRows[1],
          },
        ]);
    });

    it('should handle unknown row types', () => {
      const gridRows = [
        { row: 'data', type: 'type' },
        { row: { id: 2 } },
        { row: 'data', type: 'type' },
      ];
      const getGridRowId = gridRow => gridRow.row.id;

      expect(tableRowsWithDataRows(gridRows, getGridRowId))
        .toEqual([
          {
            key: `${TABLE_UNKNOWN_TYPE}_0`,
            type: TABLE_UNKNOWN_TYPE,
            gridRow: gridRows[0],
          },
          {
            key: `${TABLE_DATA_TYPE}_2`,
            type: TABLE_DATA_TYPE,
            rowId: 2,
            row: gridRows[1].row,
            gridRow: gridRows[1],
          },
          {
            key: `${TABLE_UNKNOWN_TYPE}_2`,
            type: TABLE_UNKNOWN_TYPE,
            gridRow: gridRows[2],
          },
        ]);
    });

    it('should add nodata row if gridRows are empty', () => {
      const gridRows = [];
      const getGridRowId = gridRow => gridRow.id;

      expect(tableRowsWithDataRows(gridRows, getGridRowId))
        .toEqual([
          { key: TABLE_NODATA_TYPE, type: TABLE_NODATA_TYPE, colSpanStart: 0 },
        ]);
    });
  });
});
