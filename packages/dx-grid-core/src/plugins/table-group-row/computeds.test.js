import { TABLE_DATA_TYPE, TABLE_UNKNOWN_TYPE } from '../table-view/constants';
import { TABLE_GROUP_TYPE } from './constants';
import { GRID_GROUP_TYPE } from '../local-grouping/constants';
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

    it('should work', () => {
      expect(tableColumnsWithGrouping(tableColumns, grouping, grouping, 123, () => false))
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
        { columnName: 'c', draft: true, mode: 'add' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123, () => false))
        .toEqual([
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
        { columnName: 'c', draft: true, mode: 'remove' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123, () => false))
        .toEqual([
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

    it('should add a draft column when reordering groups', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', draft: true, mode: 'reorder' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123, () => false))
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

    it('can keep grouped columns in table', () => {
      expect(tableColumnsWithGrouping(tableColumns, grouping, grouping, 123, columnName => columnName === 'c'))
        .toEqual([
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
    it('should add correct colSpanStart to group rows', () => {
      const tableRows = [
        { type: TABLE_UNKNOWN_TYPE, gridRow: { type: GRID_GROUP_TYPE, groupedBy: 'a', row: { key: 'B', value: 'B' } } },
        { type: TABLE_UNKNOWN_TYPE, gridRow: { row: { id: 0 } } },
        { type: TABLE_DATA_TYPE, gridRow: {}, row: { id: 1 } },
        { type: TABLE_DATA_TYPE, gridRow: {}, row: { id: 2 } },
      ];

      expect(tableRowsWithGrouping(tableRows))
        .toEqual([
          {
            key: `${TABLE_GROUP_TYPE}_B`,
            type: TABLE_GROUP_TYPE,
            gridRow: { type: GRID_GROUP_TYPE, groupedBy: 'a', row: { key: 'B', value: 'B' } },
            row: { key: 'B', value: 'B' },
            colSpanStart: `${TABLE_GROUP_TYPE}_a`,
          },
          { type: TABLE_UNKNOWN_TYPE, gridRow: { row: { id: 0 } } },
          { type: TABLE_DATA_TYPE, gridRow: {}, row: { id: 1 } },
          { type: TABLE_DATA_TYPE, gridRow: {}, row: { id: 2 } },
        ]);
    });
  });
});
