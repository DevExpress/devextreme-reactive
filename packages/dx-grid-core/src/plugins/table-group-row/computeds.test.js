import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from './constants';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
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

    it('should work', () => {
      expect(tableColumnsWithGrouping(columns, tableColumns, grouping, grouping, 123, () => false))
        .toEqual([
          {
            key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
          },
          {
            key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
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
        columns, tableColumns, grouping,
        draftGrouping, 123, () => false,
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
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
        columns, tableColumns, grouping,
        draftGrouping, 123, () => false,
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
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
        columns, tableColumns, grouping,
        draftGrouping, 123, () => false,
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
        },
        { type: 'undefined', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]);
    });

    it('can keep grouped columns in table', () => {
      expect(tableColumnsWithGrouping(
        columns, tableColumns, grouping,
        grouping, 123, columnName => columnName === 'c',
      )).toEqual([
        {
          key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123,
        },
        {
          key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123,
        },
        { type: 'undefined', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]);
    });
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
            key: `${TABLE_GROUP_TYPE}_B`,
            type: TABLE_GROUP_TYPE,
            row: { group: true, groupedBy: 'a', compoundKey: 'B' },
            colSpanStart: `${TABLE_GROUP_TYPE}_a`,
          },
          { type: TABLE_DATA_TYPE, row: { id: 0 } },
          { type: TABLE_DATA_TYPE, row: { id: 1 } },
          { type: TABLE_DATA_TYPE, row: { id: 2 } },
        ]);
    });
  });
});
