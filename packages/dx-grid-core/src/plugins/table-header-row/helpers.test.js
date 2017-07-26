import { HEADING_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';
import {
  isHeadingTableCell,
} from './helpers';

describe('TableHeaderRow Plugin helpers', () => {
  describe('#isHeadingTableCell', () => {
    it('should work', () => {
      expect(isHeadingTableCell({ type: HEADING_TYPE }, { type: DATA_TYPE }))
        .toBeTruthy();
      expect(isHeadingTableCell({ type: HEADING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isHeadingTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
