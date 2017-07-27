import { TABLE_EDIT_COMMAND_TYPE } from './constants';

export const tableColumnsWithEditing = (tableColumns, width) =>
  [{ type: TABLE_EDIT_COMMAND_TYPE, id: 0, width }, ...tableColumns];
