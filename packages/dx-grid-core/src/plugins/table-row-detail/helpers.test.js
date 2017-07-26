import { DETAIL_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';
import {
  isDetailRowExpanded,
  isDetailToggleTableCell,
  isDetailTableRow,
} from './helpers';

describe('TableRowDetail Plugin helpers', () => {
  describe('#isDetailRowExpanded', () => {
    it('should work', () => {
      const expandedRows = [1];

      expect(isDetailRowExpanded(expandedRows, 1)).toBeTruthy();
      expect(isDetailRowExpanded(expandedRows, 2)).toBeFalsy();
    });
  });

  describe('#isDetailToggleTableCell', () => {
    it('should work', () => {
      expect(isDetailToggleTableCell({ type: DATA_TYPE }, { type: DETAIL_TYPE }))
        .toBeTruthy();
      expect(isDetailToggleTableCell({ type: 'undefined' }, { type: DETAIL_TYPE }))
        .toBeFalsy();
      expect(isDetailToggleTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isDetailTableRow', () => {
    it('should work', () => {
      expect(isDetailTableRow({ type: DETAIL_TYPE }))
        .toBeTruthy();
      expect(isDetailTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
