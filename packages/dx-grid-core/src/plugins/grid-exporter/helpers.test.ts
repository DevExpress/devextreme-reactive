import { findRanges, buildGroupTree, exportHeader, exportRows } from './helpers';
import { ROOT_GROUP } from './constants';

describe('export helpers', () => {
  describe('#buildGroupTree', () => {
    describe('withour grouping', () => {
      it('should work with flat rows', () => {
        const rows = [{}, {}, {}];
        expect(buildGroupTree(
          rows, {}, undefined, undefined, 2,
        ))
          .toEqual({
            [ROOT_GROUP]: [2, 4],
          });
      });
    });

    describe('with grouping', () => {
      const grouping = [{ columnName: 'a' }, { columnName: 'b' }];
      const rows = [
        { groupedBy: 'a', compoundKey: '1' },   // 2
        { groupedBy: 'b', compoundKey: '1|1' }, // 3
        {}, // 4
        {}, // 5
        {}, // 6
        // summary
        { groupedBy: 'b', compoundKey: '1|2' }, // 7 [8]
        {}, // 8 [9]
        // summary
        { groupedBy: 'b', compoundKey: '1|3' }, // 9 [11]
        {}, // 10 [12]
        {}, // 11 [13]
        // summary for b
        // summary for a
        { groupedBy: 'a', compoundKey: '2' }, // 12 [16]
        { groupedBy: 'b', compoundKey: '2|1' }, // 13 [17]
        {}, // 14 [18]
        {}, // 15 [19]
        // summary for b
        // summary for a
      ];
      const outlineLevels = {
        'a': 0,
        'b': 1,
      };

      it('should work without group summary', () => {
        expect(buildGroupTree(
          rows, outlineLevels, grouping, undefined, 2,
        ))
          .toEqual({
            [ROOT_GROUP]: ['1', '2'],
            1: ['1|1', '1|2', '1|3'],
            '1|1': [4, 6],
            '1|2': [8, 8],
            '1|3': [10, 11],
            2: ['2|1'],
            '2|1': [14, 15],
          });
      });

      it('should work with group summary', () => {
        expect(buildGroupTree(
          rows, outlineLevels, grouping, [], 2,
        ))
          .toEqual({
            [ROOT_GROUP]: ['1', '2'],
            1: ['1|1', '1|2', '1|3'],
            '1|1': [4, 6],
            '1|2': [9, 9],
            '1|3': [12, 13],
            2: ['2|1'],
            '2|1': [18, 19],
          });
      });
    });
  });

  describe('#exportHeader', () => {
    it('should work', () => {
      const worksheet = {
        addRow: jest.fn(),
        views: [],
        columns: null,
        lastRow: { number: 'last' },
      };
      const columns = [
        { column: { name: 'a', title: 'Column A' } },
        { column: { name: 'b', title: 'Column B' }, width: 200 },
      ];

      exportHeader(worksheet, columns);

      expect(worksheet.columns)
        .toEqual([
          { key: 'a', width: 18.75 },
          { key: 'b', width: 25 },
        ]);
      expect(worksheet.views)
        .toEqual([{
          state: 'frozen',
          ySplit: 'last',
        }]);
      expect(worksheet.addRow)
      .toHaveBeenCalledTimes(2);
      expect(worksheet.addRow)
        .toHaveBeenNthCalledWith(1, {});
      expect(worksheet.addRow)
        .toHaveBeenNthCalledWith(2, {
          a: 'Column A',
          b: 'Column B',
        });
    });
  });

  describe('#findRanges', () => {
    const groupTree = {
      [ROOT_GROUP]: ['group1', 'group2'],
      group1: ['group1|nested1', 'group1|nested2'],
      'group1|nested1': [4, 10],
      'group1|nested2': [12, 15],
      group2: ['group2|nested1', 'group2|nested2'],
      'group2|nested1': [18, 23],
      'group2|nested2': [25, 30],
    };

    it('should return range for flat rows', () => {
      expect(findRanges(
        { [ROOT_GROUP]: [5, 20] }, ROOT_GROUP, 0, 0, 
      ))
        .toEqual([[5, 20]]);
    });

    it('should return range for a nested group', () => {
      expect(findRanges(
        groupTree, 'group1|nested1', 1, 1,
      ))
        .toEqual([[4, 10]]);
    });

    it('should return ranges for high level groups', () => {
      expect(findRanges(
        groupTree, 'group1', 0, 1,
      ))
        .toEqual([[4, 10], [12, 15]]);
    });

    it('should return all ranges', () => {
      expect(findRanges(
        groupTree, ROOT_GROUP, -1, 1,
      ))
        .toEqual([[4, 10], [12, 15], [18, 23], [25, 30]]);
    });
  });

  describe('#exportRows', () => {
    const dataColumns = ['a', 'b', 'c'].map((name) => ({ name, title: name }));
    const tableColumns = dataColumns.map((column) => ({ column }));
    const getCellValue = (row, name) => row[name];
    const cells = [{}, {}, {}];
    let worksheet;
    let cellStub;
    let rows;
    const closeGroup = jest.fn();
    const customizeCell = jest.fn();
    const getCell = jest.fn();
    const eachCell = jest.fn().mockImplementation((callback) => {
      cells.forEach((cell, index) => callback(cell, index + 1));
    });
    let lastRowStub;

    beforeEach(() => {
      lastRowStub = {
        number: 'last index',
        getCell,
        eachCell,
      };
      cellStub = {};
      getCell.mockReturnValue(cellStub);
      worksheet = {
        addRow: jest.fn(),
        mergeCells: jest.fn(),
        lastRow: lastRowStub,
      }
    });
    afterEach(jest.clearAllMocks);

    describe('data rows', () => {
      const dataRows = [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
      ];
      beforeEach(() => {
        exportRows(
          worksheet, dataRows, dataColumns, tableColumns, {},
          getCellValue, closeGroup, customizeCell,
        );
      });

      it('should export all rows', () => { 
        expect(worksheet.addRow)
          .toHaveBeenCalledTimes(2);
        expect(worksheet.addRow)
          .toHaveBeenNthCalledWith(1, dataRows[0]);
        expect(worksheet.addRow)
          .toHaveBeenNthCalledWith(2, dataRows[1]);
      });

      it('should customize each cell', () => {
        expect(customizeCell)
          .toHaveBeenCalledTimes(6);
        expect(customizeCell)
          .toHaveBeenNthCalledWith(1, cells[0], dataRows[0], dataColumns[0]);
        expect(customizeCell)
          .toHaveBeenNthCalledWith(2, cells[1], dataRows[0], dataColumns[1]);
        expect(customizeCell)
          .toHaveBeenNthCalledWith(3, cells[2], dataRows[0], dataColumns[2]);
        expect(customizeCell)
          .toHaveBeenNthCalledWith(4, cells[0], dataRows[1], dataColumns[0]);
        expect(customizeCell)
          .toHaveBeenNthCalledWith(5, cells[1], dataRows[1], dataColumns[1]);
        expect(customizeCell)
          .toHaveBeenNthCalledWith(6, cells[2], dataRows[1], dataColumns[2]);
      });
    });

    describe('group rows', () => {
      const groupRows = [
        { groupedBy: 'a', compoundKey: 'a_0', value: 'group A' },
        { groupedBy: 'b', compoundKey: 'a_0|b', value: 'group B' },
        { a: 1, b: 2, c: 3 },
      ];
      const outlineLevels = { a: 0, b: 1 };
      const rows = [];

      beforeEach(() => {
        worksheet.addRow.mockImplementation((row) => {
          rows.push({
            ...lastRowStub,
            ...row,
          });
        });
        Object.defineProperty(worksheet, 'lastRow', {
          get: () => rows[rows.length - 1],
        });

        exportRows(
          worksheet, groupRows, dataColumns, tableColumns, outlineLevels,
          getCellValue, closeGroup, customizeCell,
        );
      })

      it('should export group rows', () => {
        expect(worksheet.addRow)
          .toHaveBeenCalledTimes(3);
        expect(worksheet.addRow)
          .toHaveBeenNthCalledWith(1, { a: 'a: group A' });
        expect(worksheet.addRow)
          .toHaveBeenNthCalledWith(2, { a: 'b: group B' });
        expect(worksheet.addRow)
          .toHaveBeenNthCalledWith(3, groupRows[2]);
      });

      it('should merge group cells', () => {
        expect(worksheet.mergeCells)
          .toHaveBeenCalledTimes(2);
        expect(worksheet.mergeCells)
          .toHaveBeenNthCalledWith(1, 'last index', 1, 'last index', 3);
        expect(worksheet.mergeCells)
          .toHaveBeenNthCalledWith(2, 'last index', 1, 'last index', 3);
      });

      it('should set outline levels', () => {
        expect(rows[0].outlineLevel)
          .toBe(undefined);
        expect(rows[1].outlineLevel)
          .toBe(1);
        expect(rows[2].outlineLevel)
          .toBe(2);
      });

      it('should apply bold font', () => {
        expect(cellStub.font)
          .toEqual({ bold: true });
      });
    });
  });
});
