import { ADD_TYPE, EDIT_TYPE } from '../table-edit-row/constants';
import { DATA_TYPE } from '../table-view/constants';
import { HEADING_TYPE } from '../table-header-row/constants';
import { EDIT_COMMANDS_TYPE } from './constants';
import {
  isHeaderEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from './helpers';

describe('TableEditColumn Plugin helpers', () => {
  describe('#isHeaderEditCommandsTableCell', () => {
    it('should work', () => {
      expect(isHeaderEditCommandsTableCell({ type: HEADING_TYPE }, { type: EDIT_COMMANDS_TYPE }))
        .toBeTruthy();
      expect(isHeaderEditCommandsTableCell({ type: HEADING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isHeaderEditCommandsTableCell({ type: 'undefined' }, { type: EDIT_COMMANDS_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isDataEditCommandsTableCell', () => {
    it('should work', () => {
      expect(isDataEditCommandsTableCell({ type: DATA_TYPE }, { type: EDIT_COMMANDS_TYPE }))
        .toBeTruthy();
      expect(isDataEditCommandsTableCell({ type: DATA_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isDataEditCommandsTableCell({ type: 'undefined' }, { type: EDIT_COMMANDS_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isEditNewRowCommandsTableCell', () => {
    it('should work', () => {
      expect(isEditNewRowCommandsTableCell({ type: ADD_TYPE }, { type: EDIT_COMMANDS_TYPE }))
        .toBeTruthy();
      expect(isEditNewRowCommandsTableCell({ type: ADD_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditNewRowCommandsTableCell({ type: 'undefined' }, { type: EDIT_COMMANDS_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isEditExistingRowCommandsTableCell', () => {
    it('should work', () => {
      expect(isEditExistingRowCommandsTableCell({ type: EDIT_TYPE }, { type: EDIT_COMMANDS_TYPE }))
        .toBeTruthy();
      expect(isEditExistingRowCommandsTableCell({ type: EDIT_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditExistingRowCommandsTableCell({ type: 'undefined' }, { type: EDIT_COMMANDS_TYPE }))
        .toBeFalsy();
    });
  });
});
