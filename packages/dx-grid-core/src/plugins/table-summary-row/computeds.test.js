import { TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE } from './constants';
import { tableRowsWithTotalSummary, tableRowsWithSummaries } from './computeds';

describe('TableSummaryRow', () => {
  describe('#tableRowsWithTotalSummary', () => {
    it('should work', () => {
      expect(tableRowsWithTotalSummary([{}]))
        .toEqual([{ key: TABLE_TOTAL_SUMMARY_TYPE, type: TABLE_TOTAL_SUMMARY_TYPE }, {}]);
    });
  });

  describe('#tableRowsWithSummaries', () => {
    it('should add summary rows in correct places', () => {
      const tableRows = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
      ];
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getRowId = row => row.a;
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE}_a2`, type: TABLE_GROUP_SUMMARY_TYPE, compoundKey: 'a2' },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE}_3`, type: TABLE_TREE_SUMMARY_TYPE, rowId: 3 },
        { key: `${TABLE_GROUP_SUMMARY_TYPE}_a3`, type: TABLE_GROUP_SUMMARY_TYPE, compoundKey: 'a3' },
      ];

      expect(tableRowsWithSummaries(tableRows, getRowLevelKey, isGroupRow, getRowId))
        .toEqual(result);
    });
  });
});
