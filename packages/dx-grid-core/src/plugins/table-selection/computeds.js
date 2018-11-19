import { TABLE_SELECT_TYPE } from './constants';

export const tableColumnsWithSelection = (tableColumns, selectionColumnWidth) => [
  { key: TABLE_SELECT_TYPE.toString(), type: TABLE_SELECT_TYPE, width: selectionColumnWidth },
  ...tableColumns,
];
