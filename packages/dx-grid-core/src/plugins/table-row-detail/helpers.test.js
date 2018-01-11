import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isDetailRowExpanded,
  isDetailToggleTableCell,
  isDetailTableRow,
} from './helpers';

describe('TableRowDetail Plugin helpers', () => {
  describe('#isDetailRowExpanded', () => {
    it('should work', () => {
      const expandedRowIds = [1];

      expect(isDetailRowExpanded(expandedRowIds, 1)).toBeTruthy();
      expect(isDetailRowExpanded(expandedRowIds, 2)).toBeFalsy();
    });
  });

  describe('#isDetailToggleTableCell', () => {
    it('should work', () => {
      expect(isDetailToggleTableCell({ type: TABLE_DATA_TYPE }, { type: TABLE_DETAIL_TYPE }))
        .toBeTruthy();
      expect(isDetailToggleTableCell({ type: 'undefined' }, { type: TABLE_DETAIL_TYPE }))
        .toBeFalsy();
      expect(isDetailToggleTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isDetailTableRow', () => {
    it('should work', () => {
      expect(isDetailTableRow({ type: TABLE_DETAIL_TYPE }))
        .toBeTruthy();
      expect(isDetailTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
