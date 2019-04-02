import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from '../table-edit-row/constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_EDIT_COMMAND_TYPE } from './constants';
import {
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
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
      expect(isHeadingEditCommandsTableCell(
        { type: 'undefined' }, { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeFalsy();
    });
  });
  describe('#isEditCommandsTableCell', () => {
    it('should work', () => {
      expect(isEditCommandsTableCell(
        { type: TABLE_ADDED_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isEditCommandsTableCell(
        { type: TABLE_EDIT_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isEditCommandsTableCell(
        { type: TABLE_DATA_TYPE },
        { type: TABLE_EDIT_COMMAND_TYPE },
      ))
        .toBeTruthy();
      expect(isEditCommandsTableCell({ type: TABLE_ADDED_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isEditCommandsTableCell({ type: 'undefined' }, { type: TABLE_EDIT_COMMAND_TYPE }))
        .toBeFalsy();
    });
  });
});
