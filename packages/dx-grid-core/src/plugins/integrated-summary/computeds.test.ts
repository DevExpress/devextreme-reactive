import { totalSummaryValues, groupSummaryValues, treeSummaryValues } from './computeds';

describe('IntegratedSummary', () => {
  const getCellValue = (row, columnName) => row[columnName];

  describe('totalSummaryValues', () => {
    it('should culculate count summary', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = [
        3,
      ];

      expect(totalSummaryValues(rows, summaryItems, getCellValue))
        .toEqual(result);
    });

    it('should culculate sum summary', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'sum' },
      ];
      const result = [
        6,
      ];

      expect(totalSummaryValues(rows, summaryItems, getCellValue))
        .toEqual(result);
    });

    it('should culculate max summary', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'max' },
      ];
      const result = [
        3,
      ];

      expect(totalSummaryValues(rows, summaryItems, getCellValue))
        .toEqual(result);
    });

    it('should culculate min summary', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'min' },
      ];
      const result = [
        1,
      ];

      expect(totalSummaryValues(rows, summaryItems, getCellValue))
        .toEqual(result);
    });

    it('should culculate avg summary', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'avg' },
      ];
      const result = [
        2,
      ];

      expect(totalSummaryValues(rows, summaryItems, getCellValue))
        .toEqual(result);
    });

    it('should correctly handle group rows', () => {
      const rows = [
        { levelKey: 'a', group: true, collapsedRows: [{ a: 1 }, { a: 2 }, { a: 3 }] },
        { levelKey: 'a', group: true },
        { a: 4 },
        { a: 5 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = [
        5,
      ];
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getCollapsedRows = row => row.collapsedRows;

      expect(totalSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      ))
        .toEqual(result);
    });

    it('should correctly handle hierarchical rows', () => {
      const rows = [
        { levelKey: 'a', a: 1, collapsedRows: [{ a: 2 }, { a: 3 }] },
        { levelKey: 'a', a: 4 },
        { a: 5 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = [
        5,
      ];
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = () => false;
      const getCollapsedRows = row => row.collapsedRows;

      expect(totalSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      ))
        .toEqual(result);
    });
  });

  describe('groupSummaryValues', () => {
    it('should calculate count summary', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true, collapsedRows: [{ a: 2 }, { a: 3 }]  },
        { levelKey: 'b', compoundKey: 'b|2', group: true },
        { a: 4 },
        { a: 5 },
        { levelKey: 'b', compoundKey: 'b|3', group: true },
        { a: 6 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = {
        'b|1': [0],
        'b|2': [2],
        'b|3': [1],
      };
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getCollapsedRows = row => row.collapsedRows;

      expect(groupSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      ))
        .toEqual(result);
    });

    it('should correctly handle trees', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true },
        { levelKey: 'c', a: 4 },
        { a: 5 },
        { a: 6 },
        { levelKey: 'c', a: 7 },
        { a: 8 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = {
        'b|1': [3],
      };
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getCollapsedRows = row => row.collapsedRows;

      expect(groupSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      ))
        .toEqual(result);
    });

    it('should calculate value summary in opened group', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true },
        { levelKey: 'c', compoundKey: 'b|c|1', group: true },
        { a: 1 },
        { a: 2 },
        { levelKey: 'c', compoundKey: 'b|c|2', group: true, collapsedRows: [{ a: 3 }, { a: 4 }] },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'sum' },
      ];
      const result = {
        'b|1': [10],
        'b|c|1': [3],
        'b|c|2': [7],
      };
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getCollapsedRows = row => row.collapsedRows;

      expect(groupSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      ))
        .toEqual(result);
    });

    it('should not calculate first level closed group', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true, collapsedRows: [] },
        { levelKey: 'c', compoundKey: 'b|c|1', group: true, collapsedRows: [] },
        { a: 1 },
        { a: 2 },
        { levelKey: 'c', compoundKey: 'b|c|2', group: true, collapsedRows: [{ a: 3 }, { a: 4 }] },
        { levelKey: 'b', compoundKey: 'b|2', group: true, collapsedRows: [{ a: 5 }, { a: 6 }] },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'sum' },
      ];
      const result = {
        'b|1': [10],
        'b|2': [0],
        'b|c|1': [3],
        'b|c|2': [7],
      };
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getCollapsedRows = row => row.collapsedRows;

      expect(groupSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      ))
        .toEqual(result);
    });
  });

  describe('treeSummaryValues', () => {
    it('should culculate count summary', () => {
      const rows = [
        { levelKey: 'a', a: 1 },
        { levelKey: 'a', a: 2 },
        { levelKey: 'b', a: 3 },
        { a: 4 },
        { levelKey: 'b', a: 5 },
        { levelKey: 'a', a: 6 },
        { a: 7 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = {
        2: [2],
        3: [1],
        6: [1],
      };
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = () => false;
      const getRowId = row => row.a;

      expect(treeSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getRowId,
      ))
        .toEqual(result);
    });

    it('should correctly handle groups', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true },
        { levelKey: 'c', a: 4 },
        { a: 5 },
        { a: 6 },
        { levelKey: 'c', a: 7 },
        { a: 8 },
      ];
      const summaryItems = [
        { columnName: 'a', type: 'count' },
      ];
      const result = {
        4: [2],
        7: [1],
      };
      const getRowLevelKey = row => row.levelKey;
      const isGroupRow = row => row.group;
      const getRowId = row => row.a;

      expect(treeSummaryValues(
        rows,
        summaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getRowId,
      ))
        .toEqual(result);
    });
  });
});
