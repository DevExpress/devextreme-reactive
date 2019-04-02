import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_DETAIL_TYPE } from './constants';
import {
  tableRowsWithExpandedDetail,
  tableColumnsWithDetail,
  tableDetailCellColSpanGetter,
} from './computeds';

describe('TableRowDetail Plugin computeds', () => {
  describe('#tableRowsWithExpandedDetail', () => {
    it('can expand one row', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
      ];
      const expandedDetailRowIds = [2];

      const rowsWithDetails = tableRowsWithExpandedDetail(tableRows, expandedDetailRowIds, 100);
      expect(rowsWithDetails).toEqual([
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
        {
          key: `${TABLE_DETAIL_TYPE.toString()}_2`,
          type: TABLE_DETAIL_TYPE,
          rowId: 2,
          row: 'row2',
          height: 100,
        },
      ]);
    });

    it('can\'t expand not data', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: 'undefined', rowId: 2, row: 'row2' },
      ];
      const expandedDetailRowIds = [2];

      const rowsWithDetails = tableRowsWithExpandedDetail(tableRows, expandedDetailRowIds, 100);
      expect(rowsWithDetails).toEqual([
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: 'undefined', rowId: 2, row: 'row2' },
      ]);
    });

    it('can expand several rows', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
      ];
      const expandedDetailRowIds = [1, 2];

      const rowsWithDetails = tableRowsWithExpandedDetail(tableRows, expandedDetailRowIds, 100);
      expect(rowsWithDetails).toEqual([
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        {
          key: `${TABLE_DETAIL_TYPE.toString()}_1`,
          type: TABLE_DETAIL_TYPE,
          rowId: 1,
          row: 'row1',
          height: 100,
        },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
        {
          key: `${TABLE_DETAIL_TYPE.toString()}_2`,
          type: TABLE_DETAIL_TYPE,
          rowId: 2,
          row: 'row2',
          height: 100,
        },
      ]);
    });
  });

  describe('#tableColumnsWithDetail', () => {
    it('should work', () => {
      expect(tableColumnsWithDetail([{}], 50))
        .toEqual([
          { key: TABLE_DETAIL_TYPE.toString(), type: TABLE_DETAIL_TYPE, width: 50 },
          {},
        ]);
    });
  });

  describe('#tableGroupCellColSpanGetter', () => {
    const parentGetCellColSpan = () => 'original';
    it('should return correct colspan', () => {
      const getCellColSpanGetter = tableDetailCellColSpanGetter(parentGetCellColSpan);

      const tableColumn = { type: 'undefined' };
      expect(getCellColSpanGetter({
        tableColumn,
        tableRow: { type: TABLE_DETAIL_TYPE },
        tableColumns: [tableColumn, {}, {}],
      }))
        .toBe(3);

      expect(getCellColSpanGetter({
        tableColumn,
        tableRow: { type: TABLE_DETAIL_TYPE },
        tableColumns: [{}, tableColumn, {}],
      }))
        .toBe('original');

      expect(getCellColSpanGetter({
        tableRow: { type: 'undefined' },
        tableColumn: { type: 'undefined' },
        tableColumns: [{}, tableColumn, {}],
      }))
        .toBe('original');
    });
  });
});
