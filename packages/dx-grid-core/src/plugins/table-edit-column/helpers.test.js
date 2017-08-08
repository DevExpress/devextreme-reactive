import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from '../table-edit-row/constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_EDIT_COMMAND_TYPE } from './constants';
import {
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from './helpers';

describe('TableEditColumn Plugin helpers', () => {
  describe('#isHeadingEditCommandsTableCell', () => {
    it('should work', () => {
      expect(isHeadingEditCommandsTableCell(
        { type: TABLE_HEADING_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isHeadingEditCommandsTableCell({ type: TABLE_HEADING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isHeadingEditCommandsTableCell({ type: 'undefined' }, { type: TABLE_EDIT_COMMAND_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isDataEditCommandsTableCell', () => {
    it('should work', () => {
      expect(isDataEditCommandsTableCell(
        { type: TABLE_DATA_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isDataEditCommandsTableCell({ type: TABLE_DATA_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isDataEditCommandsTableCell({ type: 'undefined' }, { type: TABLE_EDIT_COMMAND_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isEditNewRowCommandsTableCell', () => {
    it('should work', () => {
      expect(isEditNewRowCommandsTableCell(
        { type: TABLE_ADDING_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isEditNewRowCommandsTableCell({ type: TABLE_ADDING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditNewRowCommandsTableCell({ type: 'undefined' }, { type: TABLE_EDIT_COMMAND_TYPE }))
        .toBeFalsy();
    });
  });
  describe('#isEditExistingRowCommandsTableCell', () => {
    it('should work', () => {
      expect(isEditExistingRowCommandsTableCell(
        { type: TABLE_EDITING_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isEditExistingRowCommandsTableCell({ type: TABLE_EDITING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditExistingRowCommandsTableCell({ type: 'undefined' }, { type: TABLE_EDIT_COMMAND_TYPE }))
        .toBeFalsy();
    });
  });
});
