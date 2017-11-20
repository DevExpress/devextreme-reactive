import { TABLE_FILTER_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isFilterTableCell,
  isFilterTableRow,
} from './helpers';

describe('TableFilterRow Plugin helpers', () => {
  describe('#isFilterTableCell', () => {
    it('should work', () => {
      expect(isFilterTableCell({ type: TABLE_FILTER_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isFilterTableCell({ type: TABLE_FILTER_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isFilterTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isFilterTableRow', () => {
    it('should work', () => {
      expect(isFilterTableRow({ type: TABLE_FILTER_TYPE })).toBeTruthy();
      expect(isFilterTableRow({ type: 'undefined' })).toBeFalsy();
    });
  });
});
