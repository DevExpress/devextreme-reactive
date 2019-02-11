import { PureComputed } from '@devexpress/dx-core';
import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { IsSpecificCellFn, IsSpecificRowFn, TableColumn, RowId } from '../../types';

export const isDetailRowExpanded: PureComputed<[RowId[], RowId], boolean> = (
  expandedDetailRowIds, rowId,
) => expandedDetailRowIds.indexOf(rowId) > -1;

export const isDetailToggleTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableColumn.type === TABLE_DETAIL_TYPE && tableRow.type === TABLE_DATA_TYPE;

export const isDetailTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_DETAIL_TYPE;

export const isDetailTableCell: PureComputed<[TableColumn, TableColumn[]], boolean> = (
  tableColumn, tableColumns,
) => tableColumns.indexOf(tableColumn) === 0;
