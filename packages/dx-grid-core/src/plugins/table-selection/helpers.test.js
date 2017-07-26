import { SELECT_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';
import { HEADING_TYPE } from '../table-header-row/constants';
import {
  isSelectAllTableCell,
  isSelectTableCell,
} from './helpers';

describe('TableSelection Plugin helpers', () => {
  describe('#isSelectAllTableCell', () => {
    it('should work', () => {
      expect(isSelectAllTableCell({ type: HEADING_TYPE }, { type: SELECT_TYPE }))
        .toBeTruthy();
      expect(isSelectAllTableCell({ type: DATA_TYPE }, { type: SELECT_TYPE }))
        .toBeFalsy();
      expect(isSelectAllTableCell({ type: 'undefined' }, { type: SELECT_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isSelectTableCell', () => {
    it('should work', () => {
      expect(isSelectTableCell({ type: DATA_TYPE }, { type: SELECT_TYPE }))
        .toBeTruthy();
      expect(isSelectTableCell({ type: HEADING_TYPE }, { type: SELECT_TYPE }))
        .toBeFalsy();
      expect(isSelectTableCell({ type: 'undefined' }, { type: SELECT_TYPE }))
        .toBeFalsy();
    });
  });
});
