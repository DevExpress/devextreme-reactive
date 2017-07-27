import { EDIT_COMMANDS_TYPE } from './constants';

export const tableColumnsWithEditing = (tableColumns, width) =>
  [{ type: EDIT_COMMANDS_TYPE, id: 0, width }, ...tableColumns];
