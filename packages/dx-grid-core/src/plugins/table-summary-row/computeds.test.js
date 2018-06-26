import { tableRowsWithSummaries } from './computeds';

describe('TableSummaryRow', () => {
  describe('#tableRowsWithSummaries', () => {
    it('should add summary rows in correct places', () => {
      const tableRows = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true } },
        { row: { a: 3 } },
        { row: { a: 4 } },
      ];
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const result = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        { key: 'groupSummary_a2', type: 'groupSummary', compoundKey: 'a2' },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true } },
        { row: { a: 3 } },
        { row: { a: 4 } },
        { key: 'groupSummary_a3', type: 'groupSummary', compoundKey: 'a3' },
      ];

      expect(tableRowsWithSummaries(tableRows, getRowLevelKey, isGroupRow))
        .toEqual(result);
    });
  });
});
