import { TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE } from './constants';
import { tableRowsWithTotalSummaries, tableRowsWithSummaries } from './computeds';

describe('TableSummaryRow', () => {
  describe('#tableRowsWithTotalSummaries', () => {
    it('should work', () => {
      expect(tableRowsWithTotalSummaries([{}]))
        .toEqual([{
          key: TABLE_TOTAL_SUMMARY_TYPE.toString(),
          type: TABLE_TOTAL_SUMMARY_TYPE,
        }, {}]);
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
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a2`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a2', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_3`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'b', a: 3 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a3`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a3', group: true } },
      ];

      expect(tableRowsWithSummaries(tableRows, getRowLevelKey, isGroupRow, getRowId))
        .toEqual(result);
    });
  });
});
