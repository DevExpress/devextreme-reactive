import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from '../table-edit-row/constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_EDIT_COMMAND_TYPE } from './constants';
import { IsSpecificCellFn } from '../../types';

export const isHeadingEditCommandsTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === TABLE_EDIT_COMMAND_TYPE;
export const isEditCommandsTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => (tableRow.type === TABLE_DATA_TYPE || tableRow.type === TABLE_ADDED_TYPE
  || tableRow.type === TABLE_EDIT_TYPE) && tableColumn.type === TABLE_EDIT_COMMAND_TYPE;
