import {
  buildGroupTree, groupOutlineLevels, rowsToExport, exportSummaryGetter,
  closeGroupGetter, maximumGroupLevel,
} from './computeds';
import { ROOT_GROUP } from './constants';

describe('export computeds', () => {
  describe('#groupTree', () => {
    const isGroupRow = ({ groupedBy }) => !!groupedBy;

    describe('without grouping', () => {
      it('should work with flat rows', () => {
        const rows = [{}, {}, {}];
        expect(buildGroupTree(
          rows, {}, undefined, isGroupRow, undefined,
        ))
          .toEqual({
            [ROOT_GROUP]: [0, 2],
          });
      });
    });

    describe('with grouping', () => {
      const grouping = [{ columnName: 'a' }, { columnName: 'b' }];
      const rows = [
        { groupedBy: 'a', compoundKey: '1' },   // 0
        { groupedBy: 'b', compoundKey: '1|1' }, // 1
        {}, // 2
        {}, // 3
        {}, // 4
        // summary
        { groupedBy: 'b', compoundKey: '1|2' }, // 5 [6]
        {}, // 6 [7]
        // summary
        { groupedBy: 'b', compoundKey: '1|3' }, // 7 [9]
        {}, // 8 [10]
        {}, // 9 [11]
        // summary for b
        // summary for a
        { groupedBy: 'a', compoundKey: '2' }, // 10 [14]
        { groupedBy: 'b', compoundKey: '2|1' }, // 11 [15]
        {}, // 12 [16]
        {}, // 13 [17]
        // summary for b
        // summary for a
      ];
      const outlineLevels = {
        a: 0,
        b: 1,
      };

      it('should work without group summary', () => {
        expect(buildGroupTree(
          rows, outlineLevels, grouping, isGroupRow, undefined,
        ))
          .toEqual({
            [ROOT_GROUP]: ['1', '2'],
            1: ['1|1', '1|2', '1|3'],
            '1|1': [2, 4],
            '1|2': [6, 6],
            '1|3': [8, 9],
            2: ['2|1'],
            '2|1': [12, 13],
          });
      });

      it('should work with group summary', () => {
        expect(buildGroupTree(
          rows, outlineLevels, grouping, isGroupRow, [],
        ))
          .toEqual({
            [ROOT_GROUP]: ['1', '2'],
            1: ['1|1', '1|2', '1|3'],
            '1|1': [2, 4],
            '1|2': [7, 7],
            '1|3': [10, 11],
            2: ['2|1'],
            '2|1': [16, 17],
          });
      });
    });
  });

  describe('#outlineLevels', () => {
    it('should work', () => {
      const grouping = [{
        columnName: 'a',
      }, {
        columnName: 'b',
      }];

      expect(groupOutlineLevels(grouping))
        .toEqual({
          a: 0,
          b: 1,
        });
    });
  });

  describe('#rowsToExport', () => {
    const grouping = [{ columnName: 'a' }, { columnName: 'b' }];
    const isGroupRow = row => !!row.groupedBy;

    it('should work with plain rows', () => {
      const rows = [{}, {}, {}];
      const getCollapsedRows = () => null;
      const getRowId = () => null;

      expect(rowsToExport(rows, null, grouping, getCollapsedRows, getRowId, isGroupRow))
        .toEqual(rows);
    });

    it('should work with collapsed groups', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { collapsedRows: [{ a: 3 }, { a: 4 }] },
      ];
      const getCollapsedRows = ({ collapsedRows }) => collapsedRows;
      const getRowId = () => null;

      expect(rowsToExport(rows, null, grouping, getCollapsedRows, getRowId, isGroupRow))
        .toEqual([
          ...rows,
          { a: 3 },
          { a: 4 },
        ]);
    });

    it('should return selected rows if selection is provided', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { groupedBy: 'a', value: 0 },
        { groupedBy: 'b', value: 1 },
        { collapsedRows: [{ a: 3 }, { a: 4 }] },
        { groupedBy: 'a', value: 0 },
        { groupedBy: 'b', value: 1 },
        { a: 5 },
        { a: 6 },
      ];
      const getCollapsedRows = ({ collapsedRows }) => collapsedRows;
      const getRowId = ({ a }) => a;
      const selection = [2, 3];

      expect(rowsToExport(rows, selection, grouping, getCollapsedRows, getRowId, isGroupRow))
        .toEqual([
          { a: 2 },
          { groupedBy: 'a', value: 0 },
          { groupedBy: 'b', value: 1 },
          { a: 3 },
        ]);
    });
  });

  describe('#exportSummaryGetter', () => {
    const columns = [
      { name: 'a' },
      { name: 'b' },
    ];
    const excelColumns = columns.reduce((acc, { name }) => ({
      ...acc,
      [name]: { letter: name.toUpperCase() },
    }), {});
    const worksheet = {
      getColumn: name => excelColumns[name],
      lastRow: {
        getCell: jest.fn(),
      },
    };
    const customizeSummaryCell = jest.fn();
    const defaultMessages = {
      sum: 'Sum is',
      max: 'Max is',
    };

    let cells;
    beforeEach(() => {
      cells = {
        a: {},
        b: {},
      };
      worksheet.lastRow.getCell.mockImplementation(columnName => cells[columnName]);
    });
    afterEach(jest.clearAllMocks);

    it('should provide function to export summary', () => {
      const exportSummary = exportSummaryGetter(
        worksheet, columns, customizeSummaryCell, defaultMessages,
      );

      exportSummary({ columnName: 'a', type: 'sum' }, [[2, 10]]);

      expect(cells.a)
        .toEqual({
          numFmt: '"Sum is:" 0',
          value: {
            formula: 'SUM(A2:A10)',
            date1904: false,
          },
        });
    });
  });

  describe('#closeGroupGetter', () => {
    const worksheet = {
      addRow: jest.fn(),
    };
    const groupTree = {
      1: ['1|1', '1|2'],
      '1|1': ['1|1|a', '1|1|b'],
      '1|1|a': [3, 5],
      '1|1|b': [7, 11],
      '1|2': ['1|2|c'],
      '1|2|c': [13, 15],
    };
    const outlineLevels = {
      a: 0,
      b: 1,
      c: 2,
    };
    const groupSummaryItems = [
      { columnName: 'a', type: 'sum' },
      { columnName: 'b', type: 'max' },
    ];
    const exportSummary = jest.fn();

    it('should export group summaries', () => {
      const expectedRanges = [[13, 15], [17, 21]];
      const closeGroup = closeGroupGetter(
        worksheet, groupTree, outlineLevels, 2, groupSummaryItems, exportSummary,
      )(10);

      closeGroup({ groupedBy: 'b', compoundKey: '1|1' });

      expect(exportSummary)
        .toHaveBeenCalledTimes(2);
      expect(exportSummary)
        .toHaveBeenNthCalledWith(1, groupSummaryItems[0], expectedRanges);
      expect(exportSummary)
        .toHaveBeenNthCalledWith(2, groupSummaryItems[1], expectedRanges);
    });
  });

  describe('#maxGroupLevel', () => {
    it('should work', () => {
      expect(maximumGroupLevel([]))
        .toBe(-1);
      expect(maximumGroupLevel([{ columnName: 'a' }, { columnName: 'b' }]))
        .toBe(1);
    });
  });
});
