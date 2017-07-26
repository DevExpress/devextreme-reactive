import { FILTER_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';
import {
  isFilterTableCell,
} from './helpers';

describe('TableFilterRow Plugin helpers', () => {
  describe('#isFilterTableCell', () => {
    it('should work', () => {
      expect(isFilterTableCell({ type: FILTER_TYPE }, { type: DATA_TYPE }))
        .toBeTruthy();
      expect(isFilterTableCell({ type: FILTER_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isFilterTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
