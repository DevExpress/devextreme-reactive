import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import {
  tableRowsWithDataRows,
  tableColumnsWithDataRows,
  tableCellColSpanGetter,
} from './computeds';

describe('Table Plugin computeds', () => {
  describe('#tableColumnsWithDataRows', () => {
    it('should work', () => {
      const columns = [{ name: 'a' }, { name: 'b' }];

      expect(tableColumnsWithDataRows(columns))
        .toEqual([
          { key: `${TABLE_DATA_TYPE}_a`, type: TABLE_DATA_TYPE, column: columns[0] },
          { key: `${TABLE_DATA_TYPE}_b`, type: TABLE_DATA_TYPE, column: columns[1] },
        ]);
    });

    it('should set width from columnExtension', () => {
      const columns = [{ name: 'a' }];
      const columnExtensions = [{ columnName: 'a', width: 100 }];

      expect(tableColumnsWithDataRows(columns, columnExtensions)[0])
        .toMatchObject({ width: 100 });
    });

    it('should set align from columnExtension', () => {
      const columns = [{ name: 'b' }];
      const columnExtensions = [{ columnName: 'b', align: 'right' }];

      expect(tableColumnsWithDataRows(columns, columnExtensions)[0])
        .toMatchObject({ align: 'right' });
    });

    it('should set wordWrapEnabled from columnExtension', () => {
      const columns = [{ name: 'b' }];
      const columnExtensions = [{ columnName: 'b', wordWrapEnabled: true }];

      expect(tableColumnsWithDataRows(columns, columnExtensions)[0])
        .toMatchObject({ wordWrapEnabled: true });
    });
  });

  describe('#tableRowsWithDataRows', () => {
    it('should work', () => {
      const rows = [
        { id: 1 },
        { id: 2 },
      ];
      const getRowId = row => row.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          {
            key: `${TABLE_DATA_TYPE}_1`,
            type: TABLE_DATA_TYPE,
            rowId: 1,
            row: rows[0],
          },
          {
            key: `${TABLE_DATA_TYPE}_2`,
            type: TABLE_DATA_TYPE,
            rowId: 2,
            row: rows[1],
          },
        ]);
    });

    it('should add nodata row if rows are empty', () => {
      const rows = [];
      const getRowId = row => row.id;

      expect(tableRowsWithDataRows(rows, getRowId))
        .toEqual([
          { key: TABLE_NODATA_TYPE, type: TABLE_NODATA_TYPE },
        ]);
    });

    describe('#tableGroupCellColSpanGetter', () => {
      it('should return correct colspan', () => {
        const tableColumn = { type: 'undefined' };
        expect(tableCellColSpanGetter({
          tableRow: { type: TABLE_NODATA_TYPE },
          tableColumn,
          tableColumns: [tableColumn, {}, {}],
        }))
          .toBe(3);

        expect(tableCellColSpanGetter({
          tableRow: { type: TABLE_NODATA_TYPE },
          tableColumn,
          tableColumns: [{}, tableColumn, {}],
        }))
          .toBe(1);

        expect(tableCellColSpanGetter({
          tableRow: { type: 'undefined' },
          tableColumn: { type: 'undefined' },
          tableColumns: [{}, tableColumn, {}],
        }))
          .toBe(1);
      });
    });
  });
});
