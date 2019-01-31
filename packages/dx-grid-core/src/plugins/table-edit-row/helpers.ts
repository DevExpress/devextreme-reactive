import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { IsSpecificRowFn, IsSpecificCellFn } from '../../types';

export const isEditTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => (tableRow.type === TABLE_ADDED_TYPE || tableRow.type === TABLE_EDIT_TYPE)
  && tableColumn.type === TABLE_DATA_TYPE;
export const isAddedTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_ADDED_TYPE;
export const isEditTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_EDIT_TYPE;
