import { TABLE_DATA_TYPE } from '../table-view/constants';
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

    it('should work', () => {
      expect(tableColumnsWithGrouping(tableColumns, grouping, grouping, 123))
        .toEqual([
          { key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123 },
          { key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123 },
          { type: 'undefined', column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'd' } },
        ]);
    });

    it('should not remove column when grouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'add' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123))
        .toEqual([
          { key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123 },
          { key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123 },
          { type: 'undefined', column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' }, isDraft: true },
          { type: TABLE_DATA_TYPE, column: { name: 'd' } },
        ]);
    });

    it('should add a draft column when ungrouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'remove' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123))
        .toEqual([
          { key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123 },
          { key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123 },
          { type: 'undefined', column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' }, isDraft: true },
          { type: TABLE_DATA_TYPE, column: { name: 'd' } },
        ]);
    });

    it('should add a draft column when reordering groups', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'reorder' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123))
        .toEqual([
          { key: `${TABLE_GROUP_TYPE}_a`, type: TABLE_GROUP_TYPE, column: { name: 'a' }, width: 123 },
          { key: `${TABLE_GROUP_TYPE}_c`, type: TABLE_GROUP_TYPE, column: { name: 'c' }, width: 123 },
          { type: 'undefined', column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'd' } },
        ]);
    });
  });
  describe('#tableRowsWithGrouping', () => {
    it('should add correct colSpanStart to group rows', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, row: { type: 'groupRow', key: 'B', groupedBy: 'a' } },
        { type: 'undefined', row: { column: { name: 'a' } } },
        { type: TABLE_DATA_TYPE, row: { column: { name: 'a' } } },
        { type: TABLE_DATA_TYPE, row: { column: { name: 'b' } } },
      ];

      expect(tableRowsWithGrouping(tableRows))
        .toEqual([
          {
            key: `${TABLE_GROUP_TYPE}_B`,
            type: TABLE_GROUP_TYPE,
            row: { type: 'groupRow', key: 'B', groupedBy: 'a' },
            colSpanStart: `${TABLE_GROUP_TYPE}_a`,
          },
          { type: 'undefined', row: { column: { name: 'a' } } },
          { type: TABLE_DATA_TYPE, row: { column: { name: 'a' } } },
          { type: TABLE_DATA_TYPE, row: { column: { name: 'b' } } },
        ]);
    });
  });
});
