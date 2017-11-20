import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isHeadingTableCell,
  isHeadingTableRow,
} from './helpers';

describe('TableHeaderRow Plugin helpers', () => {
  describe('#isHeadingTableCell', () => {
    it('should work', () => {
      expect(isHeadingTableCell({ type: TABLE_HEADING_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isHeadingTableCell({ type: TABLE_HEADING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isHeadingTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isHeadingTableRow', () => {
    it('should work', () => {
      expect(isHeadingTableRow({ type: TABLE_HEADING_TYPE }))
        .toBeTruthy();
      expect(isHeadingTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
