import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from '../table-edit-row/constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_EDIT_COMMAND_TYPE } from './constants';

export const isHeaderEditCommandsTableCell = (row, column) =>
  row.type === TABLE_HEADING_TYPE && column.type === TABLE_EDIT_COMMAND_TYPE;
export const isEditNewRowCommandsTableCell = (row, column) =>
  row.type === TABLE_ADDING_TYPE && column.type === TABLE_EDIT_COMMAND_TYPE;
export const isDataEditCommandsTableCell = (row, column) =>
  row.type === TABLE_DATA_TYPE && column.type === TABLE_EDIT_COMMAND_TYPE;
export const isEditExistingRowCommandsTableCell = (row, column) =>
  row.type === TABLE_EDITING_TYPE && column.type === TABLE_EDIT_COMMAND_TYPE;
