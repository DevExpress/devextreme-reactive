import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isEditTableCell,
  isAddedTableRow,
  isEditTableRow,
} from './helpers';

describe('TableEditRow Plugin helpers', () => {
  describe('#isEditTableCell', () => {
    it('should work', () => {
      expect(isEditTableCell({ type: TABLE_ADDED_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isEditTableCell({ type: TABLE_EDIT_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isEditTableCell({ type: TABLE_ADDED_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditTableCell({ type: TABLE_EDIT_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isAddedTableRow', () => {
    it('should work', () => {
      expect(isAddedTableRow({ type: TABLE_ADDED_TYPE }))
        .toBeTruthy();
      expect(isAddedTableRow({ type: TABLE_EDIT_TYPE }))
        .toBeFalsy();
      expect(isAddedTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isEditTableRow', () => {
    it('should work', () => {
      expect(isEditTableRow({ type: TABLE_EDIT_TYPE }))
        .toBeTruthy();
      expect(isEditTableRow({ type: TABLE_ADDED_TYPE }))
        .toBeFalsy();
      expect(isEditTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
});
