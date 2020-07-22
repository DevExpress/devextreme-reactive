import {
  TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE,
} from './constants';
import { tableRowsWithTotalSummaries, tableRowsWithSummaries } from './computeds';

describe('TableSummaryRow', () => {
  describe('#tableRowsWithTotalSummaries', () => {
    it('should work', () => {
      expect(tableRowsWithTotalSummaries([{}]))
        .toEqual([
          {
            key: TABLE_TOTAL_SUMMARY_TYPE.toString(),
            type: TABLE_TOTAL_SUMMARY_TYPE,
          },
          {},
        ]);
    });
  });

  describe('#tableRowsWithSummaries', () => {
    const groupSummaryItems = [{ showInGroupFooter: true }];
    const treeSummaryItems = [{}];
    const tableRows = [
      { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
      { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
      { row: { a: 1 } },
      { row: { a: 2 } },
      { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
      { row: { levelKey: 'b', a: 3 } },
      { row: { a: 4 } },
    ];
    const getRowLevelKey = row => row.levelKey;
    const isGroupRow = row => row.group;
    const getRowId = row => row.a;

    /* tslint:disable: max-line-length */
    it('should not add summary rows if "groupSummaryItems" and "treeSummaryItems" are empty arrays', () => {
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
      ];
      /* tslint:enable: max-line-length */

      expect(tableRowsWithSummaries(
        tableRows, [], [], getRowLevelKey, isGroupRow, getRowId,
      ))
        .toEqual(result);
    });

    it('should add summary rows in correct places', () => {
      /* tslint:disable: max-line-length */
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a2`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_3`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'b', a: 3 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a3`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
      ];
      /* tslint:enable: max-line-length */

      expect(tableRowsWithSummaries(
        tableRows, groupSummaryItems, treeSummaryItems, getRowLevelKey, isGroupRow, getRowId,
      ))
        .toEqual(result);
    });

    it('should not add tree summary row if "treeSummaryItems" is empty array', () => {
      /* tslint:disable: max-line-length */
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a2`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a3`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
      ];
      /* tslint:enable: max-line-length */

      expect(tableRowsWithSummaries(
        tableRows, groupSummaryItems, [], getRowLevelKey, isGroupRow, getRowId,
      ))
        .toEqual(result);
    });

    it('should not add group summary row if "groupSummaryItems" is empty array', () => {
      /* tslint:disable: max-line-length */
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_a2`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_3`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'b', a: 3 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_a3`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
      ];
      /* tslint:enable: max-line-length */

      expect(tableRowsWithSummaries(
        tableRows, [], treeSummaryItems, getRowLevelKey, isGroupRow, getRowId,
      ))
        .toEqual(result);
    });

    it('should not add group summary row if no footer summaries are specified', () => {
      const groupItems = [{
        showInGroupFooter: false,
      }];
      /* tslint:disable: max-line-length */
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_a2`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_3`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'b', a: 3 } },
        { key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_a3`, type: TABLE_TREE_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
      ];
      /* tslint:enable: max-line-length */

      expect(tableRowsWithSummaries(
        tableRows, groupItems, treeSummaryItems, getRowLevelKey, isGroupRow, getRowId,
      ))
        .toEqual(result);
    });

    it('should sort group summary rows correctly', () => {
      const testTableRows = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'b', compoundKey: 'a1|b1', group: true } },
        { row: { levelKey: 'b', compoundKey: 'a1|b2', group: true } },
        { row: { a: 1 } },
        { row: { levelKey: 'b', compoundKey: 'a1|b3', group: true } },
        { row: { a: 2 } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true } },
      ];

      /* tslint:disable: max-line-length */
      const expectedResult = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'b', compoundKey: 'a1|b1', group: true } },
        { row: { levelKey: 'b', compoundKey: 'a1|b2', group: true } },
        { row: { a: 1 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a1|b2`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'b', compoundKey: 'a1|b2', group: true } },
        { row: { levelKey: 'b', compoundKey: 'a1|b3', group: true } },
        { row: { a: 2 } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a1|b3`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'b', compoundKey: 'a1|b3', group: true } },
        { key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a1`, type: TABLE_GROUP_SUMMARY_TYPE, row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true } },
      ];
      /* tslint:enable: max-line-length */

      expect(tableRowsWithSummaries(
        testTableRows, groupSummaryItems, treeSummaryItems, getRowLevelKey, isGroupRow, getRowId,
      ))
        .toEqual(expectedResult);
    });
  });
});
