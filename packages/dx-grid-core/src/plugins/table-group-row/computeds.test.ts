import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from './constants';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  tableGroupCellColSpanGetter,
} from './computeds';

describe('TableGroupRow Plugin computeds', () => {
  describe('#tableColumnsWithGrouping', () => {
    const tableColumns = [
      { type: 'undefined', column: { name: 'a' } },
      { type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      { type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ];
    const grouping = [
      { columnName: 'a' },
      { columnName: 'c' },
    ];
    const columns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];

    /* tslint:disable max-line-length */
    it('should work', () => {
      expect(tableColumnsWithGrouping(tableColumns, columns, grouping, grouping, 123, () => false))
        .toEqual([
          {
            key: `${TABLE_GROUP_TYPE.toString()}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
          },
          {
            key: `${TABLE_GROUP_TYPE.toString()}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
          },
          { type: 'undefined', column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'd' } },
        ]);
    });

    it('should not remove column when grouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
      ];
      expect(tableColumnsWithGrouping(
        tableColumns, columns, grouping,
        draftGrouping, 123, () => false,
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE.toString()}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE.toString()}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
        },
        { type: 'undefined', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' }, draft: true },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]);
    });

    it('should add a draft column when ungrouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'b' },
        { columnName: 'c' },
      ];
      expect(tableColumnsWithGrouping(
        tableColumns, columns, grouping,
        draftGrouping, 123, () => false,
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE.toString()}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE.toString()}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
        },
        { type: 'undefined', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' }, draft: true },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]);
    });

    it('should not add a draft column when reordering groups', () => {
      const draftGrouping = [
        { columnName: 'c' },
        { columnName: 'a' },
      ];
      expect(tableColumnsWithGrouping(
        tableColumns, columns, grouping,
        draftGrouping, 123, () => false,
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE.toString()}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE.toString()}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
        },
        { type: 'undefined', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]);
    });

    it('can keep grouped columns in table', () => {
      expect(tableColumnsWithGrouping(
        tableColumns, columns, grouping,
        grouping, 123, columnName => columnName === 'c',
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE.toString()}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE.toString()}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
        },
        { type: 'undefined', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]);
    });
    /* tslint:enable max-line-length */
  });

  describe('#tableRowsWithGrouping', () => {
    it('should convert table rows containing group data to group rows', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, row: { group: true, groupedBy: 'a', compoundKey: 'B' } },
        { type: TABLE_DATA_TYPE, row: { id: 0 } },
        { type: TABLE_DATA_TYPE, row: { id: 1 } },
        { type: TABLE_DATA_TYPE, row: { id: 2 } },
      ];
      const isGroupRow = row => row.group;

      expect(tableRowsWithGrouping(tableRows, isGroupRow))
        .toEqual([
          {
            key: `${TABLE_GROUP_TYPE.toString()}_B`,
            type: TABLE_GROUP_TYPE,
            row: { group: true, groupedBy: 'a', compoundKey: 'B' },
          },
          { type: TABLE_DATA_TYPE, row: { id: 0 } },
          { type: TABLE_DATA_TYPE, row: { id: 1 } },
          { type: TABLE_DATA_TYPE, row: { id: 2 } },
        ]);
    });
  });

  describe('#tableGroupCellColSpanGetter', () => {
    const parentGetCellColSpan = () => 'original';
    it('should return correct colspan', () => {
      const getCellColSpanGetter = tableGroupCellColSpanGetter(parentGetCellColSpan);

      const tableColumn = { type: TABLE_GROUP_TYPE, column: { name: 'a' } };
      expect(getCellColSpanGetter({
        tableColumn,
        tableRow: { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        tableColumns: [tableColumn, {}, {}],
      }))
        .toBe(3);

      expect(getCellColSpanGetter({
        tableColumn,
        tableRow: { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        tableColumns: [{}, tableColumn, {}],
      }))
        .toBe(2);

      expect(getCellColSpanGetter({
        tableColumn,
        tableRow: { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        tableColumns: [{}, tableColumn, {}],
      }))
        .toBe('original');
    });
  });
});
