import { TABLE_GROUP_TYPE } from './constants';
import {
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
} from './helpers';

describe('TableRowDetail Plugin helpers', () => {
  describe('#isGroupTableCell', () => {
    it('should work', () => {
      expect(isGroupTableCell(
        { type: TABLE_GROUP_TYPE, gridRow: { groupedBy: 'a' }, row: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeTruthy();
      expect(isGroupTableCell(
        { type: TABLE_GROUP_TYPE, gridRow: { groupedBy: 'b' }, row: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupTableCell(
        { type: TABLE_GROUP_TYPE, gridRow: { groupedBy: 'b' }, row: {} },
        { type: 'undefined', column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupTableCell(
        { type: 'undefined', gridRow: { groupedBy: 'b' }, row: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
    });

    // TODO: remove with custom grouping release
    it('should work in legacy mode', () => {
      expect(isGroupTableCell(
        { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' }, gridRow: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeTruthy();
      expect(isGroupTableCell(
        { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' }, gridRow: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupTableCell(
        { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' }, gridRow: {} },
        { type: 'undefined', column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupTableCell(
        { type: 'undefined', row: { groupedBy: 'b' }, gridRow: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
    });
  });
  describe('#isGroupIndentTableCell', () => {
    it('should work', () => {
      expect(isGroupIndentTableCell(
        { type: TABLE_GROUP_TYPE, gridRow: { groupedBy: 'b' }, row: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeTruthy();
      expect(isGroupIndentTableCell(
        { type: TABLE_GROUP_TYPE, gridRow: { groupedBy: 'a' }, row: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { type: TABLE_GROUP_TYPE, gridRow: { groupedBy: 'b' }, row: {} },
        { type: 'undefined', column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { type: 'undefined', gridRow: { groupedBy: 'b' }, row: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
    });

    // TODO: remove with custom grouping release
    it('should work in legacy mode', () => {
      expect(isGroupIndentTableCell(
        { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' }, gridRow: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeTruthy();
      expect(isGroupIndentTableCell(
        { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' }, gridRow: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' }, gridRow: {} },
        { type: 'undefined', column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isGroupIndentTableCell(
        { type: 'undefined', row: { groupedBy: 'b' }, gridRow: {} },
        { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
    });
  });
  describe('#isGroupTableRow', () => {
    it('should work', () => {
      expect(isGroupTableRow({ type: TABLE_GROUP_TYPE })).toBeTruthy();
      expect(isGroupTableRow({ type: 'undefined' })).toBeFalsy();
    });
  });
});
