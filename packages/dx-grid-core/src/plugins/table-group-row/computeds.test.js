import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_GROUP_TYPE } from './constants';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
} from './computeds';

describe('TableGroupRow Plugin computeds', () => {
  describe('#tableColumnsWithGrouping', () => {
    const tableColumns = [
      { type: 'undefined', id: 'c', column: 'column_a' },
      { type: TABLE_DATA_TYPE, id: 'a', column: 'column_a' },
      { type: TABLE_DATA_TYPE, id: 'b', column: 'column_b' },
      { type: TABLE_DATA_TYPE, id: 'c', column: 'column_c' },
      { type: TABLE_DATA_TYPE, id: 'd', column: 'column_d' },
    ];
    const grouping = [
      { columnName: 'a' },
      { columnName: 'c' },
    ];

    it('should work', () => {
      expect(tableColumnsWithGrouping(tableColumns, grouping, grouping, 123))
        .toEqual([
          { type: TABLE_GROUP_TYPE, id: 'a', width: 123 },
          { type: TABLE_GROUP_TYPE, id: 'c', width: 123 },
          { type: 'undefined', id: 'c', column: 'column_a' },
          { type: TABLE_DATA_TYPE, id: 'b', column: 'column_b' },
          { type: TABLE_DATA_TYPE, id: 'd', column: 'column_d' },
        ]);
    });

    it('should not remove column when grouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'add' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123))
        .toEqual([
          { type: TABLE_GROUP_TYPE, id: 'a', width: 123 },
          { type: TABLE_GROUP_TYPE, id: 'c', width: 123 },
          { type: 'undefined', id: 'c', column: 'column_a' },
          { type: TABLE_DATA_TYPE, id: 'b', column: 'column_b' },
          { type: TABLE_DATA_TYPE, id: 'c', column: 'column_c', isDraft: true },
          { type: TABLE_DATA_TYPE, id: 'd', column: 'column_d' },
        ]);
    });

    it('should add a draft column when ungrouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'remove' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123))
        .toEqual([
          { type: TABLE_GROUP_TYPE, id: 'a', width: 123 },
          { type: TABLE_GROUP_TYPE, id: 'c', width: 123 },
          { type: 'undefined', id: 'c', column: 'column_a' },
          { type: TABLE_DATA_TYPE, id: 'b', column: 'column_b' },
          { type: TABLE_DATA_TYPE, id: 'c', column: 'column_c', isDraft: true },
          { type: TABLE_DATA_TYPE, id: 'd', column: 'column_d' },
        ]);
    });

    it('should add a draft column when reordering groups', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'reorder' },
      ];
      expect(tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, 123))
        .toEqual([
          { type: TABLE_GROUP_TYPE, id: 'a', width: 123 },
          { type: TABLE_GROUP_TYPE, id: 'c', width: 123 },
          { type: 'undefined', id: 'c', column: 'column_a' },
          { type: TABLE_DATA_TYPE, id: 'b', column: 'column_b' },
          { type: TABLE_DATA_TYPE, id: 'd', column: 'column_d' },
        ]);
    });
  });
  describe('#tableRowsWithGrouping', () => {
    it('should add correct colSpanStart to group rows', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, row: { type: 'groupRow', key: 'B', column: { name: 'a' } } },
        { type: 'undefined', row: { column: { name: 'a' } } },
        { type: TABLE_DATA_TYPE, row: { column: { name: 'a' } } },
        { type: TABLE_DATA_TYPE, row: { column: { name: 'b' } } },
      ];

      expect(tableRowsWithGrouping(tableRows))
        .toEqual([
          { type: TABLE_GROUP_TYPE, id: 'a_B', row: { type: 'groupRow', key: 'B', column: { name: 'a' } }, colSpanStart: `${TABLE_GROUP_TYPE}_a` },
          { type: 'undefined', row: { column: { name: 'a' } } },
          { type: TABLE_DATA_TYPE, row: { column: { name: 'a' } } },
          { type: TABLE_DATA_TYPE, row: { column: { name: 'b' } } },
        ]);
    });
  });
});
