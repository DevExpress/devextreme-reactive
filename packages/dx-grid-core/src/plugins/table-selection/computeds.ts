import { PureComputed } from '@devexpress/dx-core';
import { TABLE_SELECT_TYPE } from './constants';
import { TableColumn } from '../../types';

export const tableColumnsWithSelection: PureComputed<[TableColumn[], number]> = (
  tableColumns, selectionColumnWidth,
) => [
  { key: TABLE_SELECT_TYPE.toString(), type: TABLE_SELECT_TYPE, width: selectionColumnWidth },
  ...tableColumns,
];
