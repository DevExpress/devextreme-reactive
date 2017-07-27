import { ADD_TYPE, EDIT_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';
import {
  isEditNewTableCell,
  isEditExistingTableCell,
} from './helpers';

describe('TableFilterRow Plugin helpers', () => {
  describe('#isEditNewTableCell', () => {
    it('should work', () => {
      expect(isEditNewTableCell({ type: ADD_TYPE }, { type: DATA_TYPE }))
        .toBeTruthy();
      expect(isEditNewTableCell({ type: ADD_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditNewTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isEditExistingTableCell', () => {
    it('should work', () => {
      expect(isEditExistingTableCell({ type: EDIT_TYPE }, { type: DATA_TYPE }))
        .toBeTruthy();
      expect(isEditExistingTableCell({ type: EDIT_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditExistingTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
