import { TABLE_GROUP_TYPE } from './constants';
import {
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
} from './helpers';

describe('TableRowDetail Plugin helpers', () => {
  describe('#isGroupTableCell', () => {
    it('should work', () => {
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } }, { type: TABLE_GROUP_TYPE, column: { name: 'a' } }))
        .toBeTruthy();
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } }, { type: TABLE_GROUP_TYPE, column: { name: 'a' } }))
        .toBeFalsy();
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } }, { type: 'undefined', column: { name: 'a' } }))
        .toBeFalsy();
      expect(isGroupTableCell({ type: 'undefined', row: { groupedBy: 'b' } }, { type: TABLE_GROUP_TYPE, column: { name: 'a' } }))
        .toBeFalsy();
    });
  });
  describe('#isGroupIndentTableCell', () => {
    it('should work', () => {
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } }, { type: TABLE_GROUP_TYPE, column: { name: 'a' } }))
        .toBeTruthy();
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } }, { type: TABLE_GROUP_TYPE, column: { name: 'a' } }))
        .toBeFalsy();
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } }, { type: 'undefined', column: { name: 'a' } }))
        .toBeFalsy();
      expect(isGroupIndentTableCell({ type: 'undefined', row: { groupedBy: 'b' } }, { type: TABLE_GROUP_TYPE, column: { name: 'a' } }))
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
