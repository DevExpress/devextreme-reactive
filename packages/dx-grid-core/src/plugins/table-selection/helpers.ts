import { PureComputed } from '@devexpress/dx-core';
import { TABLE_SELECT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { IsSpecificCellFn, TableRow } from '../../types';

export const isSelectTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableColumn.type === TABLE_SELECT_TYPE && tableRow.type === TABLE_DATA_TYPE;
export const isSelectAllTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableColumn.type === TABLE_SELECT_TYPE && tableRow.type === TABLE_HEADING_TYPE;

export const isRowHighlighted: PureComputed<[boolean, any[], TableRow], boolean> = (
  highlightRow, selection, tableRow,
) => (
  highlightRow && selection && selection.includes(tableRow.rowId)
);
