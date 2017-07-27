import { ADD_TYPE, EDIT_TYPE } from '../table-edit-row/constants';
import { DATA_TYPE } from '../table-view/constants';
import { HEADING_TYPE } from '../table-header-row/constants';
import { EDIT_COMMANDS_TYPE } from './constants';

export const isHeaderEditCommandsTableCell = (row, column) =>
  row.type === HEADING_TYPE && column.type === EDIT_COMMANDS_TYPE;
export const isEditNewRowCommandsTableCell = (row, column) =>
  row.type === ADD_TYPE && column.type === EDIT_COMMANDS_TYPE;
export const isDataEditCommandsTableCell = (row, column) =>
  row.type === DATA_TYPE && column.type === EDIT_COMMANDS_TYPE;
export const isEditExistingRowCommandsTableCell = (row, column) =>
  row.type === EDIT_TYPE && column.type === EDIT_COMMANDS_TYPE;
