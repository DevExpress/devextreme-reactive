import { PureComputed } from '@devexpress/dx-core';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TableColumn } from '../../types';

export const visibleTableColumns: PureComputed<[TableColumn[], string[]]> = (
  tableColumns = [], hiddenColumnNames,
) => tableColumns.filter(tableColumn => tableColumn.type !== TABLE_DATA_TYPE
    || hiddenColumnNames.indexOf(tableColumn.column!.name) === -1);
