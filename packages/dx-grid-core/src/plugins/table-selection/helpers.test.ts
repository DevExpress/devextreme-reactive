import { TABLE_SELECT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import {
  isSelectAllTableCell,
  isSelectTableCell,
  isRowHighlighted,
} from './helpers';

describe('TableSelection Plugin helpers', () => {
  describe('#isSelectAllTableCell', () => {
    it('should work', () => {
      expect(isSelectAllTableCell({ type: TABLE_HEADING_TYPE }, { type: TABLE_SELECT_TYPE }))
        .toBeTruthy();
      expect(isSelectAllTableCell({ type: TABLE_DATA_TYPE }, { type: TABLE_SELECT_TYPE }))
        .toBeFalsy();
      expect(isSelectAllTableCell({ type: 'undefined' }, { type: TABLE_SELECT_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isSelectTableCell', () => {
    it('should work', () => {
      expect(isSelectTableCell({ type: TABLE_DATA_TYPE }, { type: TABLE_SELECT_TYPE }))
        .toBeTruthy();
      expect(isSelectTableCell({ type: TABLE_HEADING_TYPE }, { type: TABLE_SELECT_TYPE }))
        .toBeFalsy();
      expect(isSelectTableCell({ type: 'undefined' }, { type: TABLE_SELECT_TYPE }))
        .toBeFalsy();
    });
  });

  describe('#isRowHighlighted', () => {
    it('should work', () => {
      expect(isRowHighlighted(true, [1], { rowId: 1 }, [2])).toBeTruthy();
      expect(isRowHighlighted(true, [1], { rowId: 2 }, [2])).toBeTruthy();
      expect(isRowHighlighted(false, [1], { rowId: 2 }, [2])).toBeFalsy();
      expect(isRowHighlighted(true, undefined, { rowId: 2 }, [2])).toBeTruthy();
      expect(isRowHighlighted(true, [2], { rowId: 2 }, undefined)).toBeTruthy();
      expect(isRowHighlighted(true, undefined, { rowId: 2 }, undefined)).toBeFalsy();
    });
  });
});
