import { TABLE_GROUP_TYPE } from './constants';
import {
  isGroupTableCell,
  isGroupIndentTableCell,
} from './helpers';

describe('TableRowDetail Plugin helpers', () => {
  describe('#isGroupTableCell', () => {
    it('should work', () => {
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, groupKey: 'a' }, { type: TABLE_GROUP_TYPE, groupKey: 'a' }))
        .toBeTruthy();
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, groupKey: 'b' }, { type: TABLE_GROUP_TYPE, groupKey: 'a' }))
        .toBeFalsy();
      expect(isGroupTableCell({ type: TABLE_GROUP_TYPE, groupKey: 'b' }, { type: 'undefined', groupKey: 'a' }))
        .toBeFalsy();
      expect(isGroupTableCell({ type: 'undefined', groupKey: 'b' }, { type: TABLE_GROUP_TYPE, groupKey: 'a' }))
        .toBeFalsy();
    });
  });
  describe('#isGroupIndentTableCell', () => {
    it('should work', () => {
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, groupKey: 'b' }, { type: TABLE_GROUP_TYPE, groupKey: 'a' }))
        .toBeTruthy();
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, groupKey: 'a' }, { type: TABLE_GROUP_TYPE, groupKey: 'a' }))
        .toBeFalsy();
      expect(isGroupIndentTableCell({ type: TABLE_GROUP_TYPE, groupKey: 'b' }, { type: 'undefined', groupKey: 'a' }))
        .toBeFalsy();
      expect(isGroupIndentTableCell({ type: 'undefined', groupKey: 'b' }, { type: TABLE_GROUP_TYPE, groupKey: 'a' }))
        .toBeFalsy();
    });
  });
});
