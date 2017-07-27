import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import {
  isEditNewTableCell,
  isEditExistingTableCell,
} from './helpers';

describe('TableEditRow Plugin helpers', () => {
  describe('#isEditNewTableCell', () => {
    it('should work', () => {
      expect(isEditNewTableCell({ type: TABLE_ADDING_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isEditNewTableCell({ type: TABLE_ADDING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditNewTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isEditExistingTableCell', () => {
    it('should work', () => {
      expect(isEditExistingTableCell({ type: TABLE_EDITING_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isEditExistingTableCell({ type: TABLE_EDITING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditExistingTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
