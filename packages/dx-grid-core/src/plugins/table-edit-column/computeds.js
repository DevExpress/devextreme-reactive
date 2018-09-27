import { TABLE_EDIT_COMMAND_TYPE } from './constants';

export const tableColumnsWithEditing = (tableColumns, width) => [
  { key: TABLE_EDIT_COMMAND_TYPE.toString(), type: TABLE_EDIT_COMMAND_TYPE, width },
  ...tableColumns];
