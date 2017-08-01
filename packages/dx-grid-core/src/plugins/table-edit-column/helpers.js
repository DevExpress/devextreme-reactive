import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from '../table-edit-row/constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_EDIT_COMMAND_TYPE } from './constants';

export const isHeadingEditCommandsTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === TABLE_EDIT_COMMAND_TYPE;
export const isEditNewRowCommandsTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_ADDING_TYPE && tableColumn.type === TABLE_EDIT_COMMAND_TYPE;
export const isDataEditCommandsTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_DATA_TYPE && tableColumn.type === TABLE_EDIT_COMMAND_TYPE;
export const isEditExistingRowCommandsTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_EDITING_TYPE && tableColumn.type === TABLE_EDIT_COMMAND_TYPE;
