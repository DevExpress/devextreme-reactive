import { PureComputed } from '@devexpress/dx-core';
import { TABLE_EDIT_COMMAND_TYPE } from './constants';
import { TableColumn } from '../../types';
import { convertWidth } from '../table-column-resizing/helpers';

export const tableColumnsWithEditing: PureComputed<[TableColumn[], number | string]> = (
  tableColumns, width,
) => [
  { width: convertWidth(width),
    key: TABLE_EDIT_COMMAND_TYPE.toString(), type: TABLE_EDIT_COMMAND_TYPE },
  ...tableColumns];
