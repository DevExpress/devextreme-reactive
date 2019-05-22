import { TABLE_GROUP_TYPE } from './constants';
import {
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
  calculateGroupCellLeft,
} from './helpers';

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

  describe('#isGroupTableRow', () => {
    it('should work', () => {
      expect(isGroupTableRow({ ...key, type: TABLE_GROUP_TYPE })).toBeTruthy();
      expect(isGroupTableRow({ ...key, type: Symbol('undefined') })).toBeFalsy();
    });
  });

  describe('#calculateGroupCellLeft', () => {
    const grouping = [
      { columnName: 'a' },
      { columnName: 'b' },
      { columnName: 'c' },
    ];

    it('should calculate left position for first level', () => {
      expect(calculateGroupCellLeft({ column: { name: 'a' } }, grouping, 30))
        .toBe(0);
    });

    it('should calculate left position for nested group', () => {
      expect(calculateGroupCellLeft({ column: { name: 'c' } }, grouping, 30))
        .toBe(60);
    });
  });
});
