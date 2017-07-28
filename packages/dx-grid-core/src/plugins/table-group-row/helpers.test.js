import { TABLE_GROUP_TYPE } from './constants';
import {
  isGroupTableCell,
  isGroupIndentTableCell,
} from './helpers';

describe('TableRowDetail Plugin helpers', () => {
  describe('#isGroupTableCell', () => {
    it('should work', () => {
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, id: 'a_A' }, { type: TABLE_GROUP_TYPE, id: 'a' }))
        .toBeTruthy();
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, id: 'b_A' }, { type: TABLE_GROUP_TYPE, id: 'a' }))
        .toBeFalsy();
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, id: 'b_A' }, { type: 'undefined', id: 'a' }))
        .toBeFalsy();
      expect(isGroupTableCell({ type: 'undefined', id: 'b_A' }, { type: TABLE_GROUP_TYPE, id: 'a' }))
        .toBeFalsy();
    });
  });
  describe('#isGroupIndentTableCell', () => {
    it('should work', () => {
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, id: 'b_A' }, { type: TABLE_GROUP_TYPE, id: 'a' }))
        .toBeTruthy();
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, id: 'a_A' }, { type: TABLE_GROUP_TYPE, id: 'a' }))
        .toBeFalsy();
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, id: 'b_A' }, { type: 'undefined', id: 'a' }))
        .toBeFalsy();
      expect(isGroupIndentTableCell({ type: 'undefined', id: 'b_A' }, { type: TABLE_GROUP_TYPE, id: 'a' }))
        .toBeFalsy();
    });
  });
});
