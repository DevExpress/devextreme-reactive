import { TABLE_GROUP_TYPE } from './constants';
import {
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupIndentStubTableCell,
  isGroupTableRow,
  isGroupRowOrdinaryCell,
  isPreviousCellContainSummary,
  isRowSummaryCell,
  calculateGroupCellIndent,
} from './helpers';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';
import { sortAndSpliceColumns } from '../..';
import { TABLE_DATA_TYPE, TABLE_FLEX_TYPE } from '../table/constants';

describe('TableRowDetail Plugin helpers', () => {
  const key = { key: 'key' };

  describe('#isGroupTableCell', () => {
    it('should work', () => {
      expect(isGroupTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeTruthy();
      expect(isGroupTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: Symbol('undefined'), column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupTableCell(
        { ...key, type: Symbol('undefined'), row: { groupedBy: 'b' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
    });
  });

  describe('#isGroupIndentTableCell', () => {
    it('should work', () => {
      expect(isGroupIndentTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeTruthy();
      expect(isGroupIndentTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'b' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: Symbol('undefined'), column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { ...key, type: Symbol('undefined'), row: { groupedBy: 'b' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
    });
  });

  describe('#isGroupIndentStubTableCell', () => {
    it('should work', () => {
      expect(isGroupIndentStubTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: TABLE_STUB_TYPE, column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeTruthy();
      expect(isGroupIndentStubTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        { ...key, type: TABLE_STUB_TYPE, column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
      expect(isGroupIndentStubTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        { ...key, type: TABLE_STUB_TYPE, column: { name: 'b' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
      expect(isGroupIndentStubTableCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: Symbol('undefined'), column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
      expect(isGroupIndentStubTableCell(
        { ...key, type: Symbol('undefined'), row: { groupedBy: 'b' } },
        { ...key, type: TABLE_STUB_TYPE, column: { name: 'a' } },
        [{ columnName: 'a' }, { columnName: 'b' }],
      ))
        .toBeFalsy();
    });
  });

  describe('#isGroupTableRow', () => {
    it('should work', () => {
      expect(isGroupTableRow({ ...key, type: TABLE_GROUP_TYPE })).toBeTruthy();
      expect(isGroupTableRow({ ...key, type: Symbol('undefined') })).toBeFalsy();
    });
  });

  describe('#isGroupRowOrdinaryCell', () => {
    it('should work', () => {
      expect(isGroupRowOrdinaryCell(
        { ...key, type: Symbol('undefined'), row: { groupedBy: 'b' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupRowOrdinaryCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupRowOrdinaryCell(
        { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
        { ...key, type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeTruthy();
    });
  });

  describe('#sortAndSpliceColumns', () => {
    const dataColumn = { type: TABLE_DATA_TYPE };
    const groupColumn = { type: TABLE_GROUP_TYPE };
    const otherColumn = { type: Symbol('undefined') };
    const flexColumn = { type: TABLE_FLEX_TYPE };

    it('should work with the Table (firstVisibleColumnIndex is not defined)', () => {
      expect(sortAndSpliceColumns([groupColumn, otherColumn, dataColumn, flexColumn]))
        .toEqual([groupColumn, otherColumn, dataColumn]);

      expect(sortAndSpliceColumns([otherColumn, groupColumn, dataColumn, flexColumn]))
        .toEqual([groupColumn, otherColumn, dataColumn]);

      expect(sortAndSpliceColumns([otherColumn, groupColumn, otherColumn, dataColumn, flexColumn]))
        .toEqual([groupColumn, otherColumn, otherColumn, dataColumn]);
    });

    describe('should work with the Virtual Table (firstVisibleColumnIndex is defined)', () => {
      it('should work with one group', () => {
        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, dataColumn, flexColumn], 0,
        ))
          .toEqual([groupColumn, otherColumn, otherColumn, otherColumn, dataColumn]);

        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, dataColumn, flexColumn], 1,
        ))
          .toEqual([groupColumn, otherColumn, otherColumn, dataColumn]);

        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, dataColumn, flexColumn], 2,
        ))
          .toEqual([groupColumn, otherColumn, dataColumn]);

        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, dataColumn, flexColumn], 3,
        ))
          .toEqual([groupColumn, otherColumn, dataColumn]);
      });

      it('should work with two groups', () => {
        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, groupColumn, dataColumn], 0,
        ))
          .toEqual([groupColumn, groupColumn, otherColumn, otherColumn, otherColumn, dataColumn]);

        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, groupColumn, dataColumn], 1,
        ))
          .toEqual([groupColumn, groupColumn, otherColumn, otherColumn, dataColumn]);

        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, groupColumn, dataColumn], 2,
        ))
          .toEqual([groupColumn, groupColumn, otherColumn, dataColumn]);

        expect(sortAndSpliceColumns(
          [otherColumn, otherColumn, groupColumn, otherColumn, groupColumn, dataColumn], 3,
        ))
          .toEqual([groupColumn, groupColumn, otherColumn, dataColumn]);
      });
    });
  });

  describe('Summary helpers', () => {
    const tableRow = { ...key, type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } };
    const tableColumns = ['g', 'a', 'b', 'c', 'd'].map(name => ({ column: { name } }));
    const groupSummaryItems = [{
      columnName: 'b',
      type: 'sum',
      showInGroupFooter: false,
      alignByColumn: true,
    }];
    const grouping = [{ columnName: 'g' }];

    describe('#isRowSummaryCell', () => {
      it('should work', () => {
        expect(isRowSummaryCell(tableRow, tableColumns[1], grouping, groupSummaryItems))
          .toBeFalsy();
        expect(isRowSummaryCell(tableRow, tableColumns[2], grouping, groupSummaryItems))
          .toBeTruthy();
        expect(isRowSummaryCell(tableRow, tableColumns[3], grouping, groupSummaryItems))
          .toBeFalsy();
      });
    });

    describe('#isPreviousCellContainSummary', () => {
      it('should work', () => {
        expect(isPreviousCellContainSummary(
          tableRow, tableColumns[1], tableColumns, grouping, groupSummaryItems,
        ))
          .toBeFalsy();
        expect(isPreviousCellContainSummary(
          tableRow, tableColumns[2], tableColumns, grouping, groupSummaryItems,
        ))
          .toBeFalsy();
        expect(isPreviousCellContainSummary(
          tableRow, tableColumns[3], tableColumns, grouping, groupSummaryItems,
        ))
          .toBeTruthy();
        expect(isPreviousCellContainSummary(
          tableRow, tableColumns[4], tableColumns, grouping, groupSummaryItems,
        ))
          .toBeFalsy();
      });
    });

    describe('#calculateGroupCellIndent', () => {
      const testGrouping = [
        { columnName: 'a' },
        { columnName: 'b' },
        { columnName: 'c' },
      ];

      it('should calculate left position for first level', () => {
        expect(calculateGroupCellIndent({ column: { name: 'a' } }, testGrouping, 30))
          .toBe(0);
      });

      it('should calculate left position for nested group', () => {
        expect(calculateGroupCellIndent({ column: { name: 'c' } }, testGrouping, 30))
          .toBe(60);
      });
    });
  });
});
