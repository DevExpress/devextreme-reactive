import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isEditTableCell = (
  tableRow, tableColumn,
) => (tableRow.type === TABLE_ADDED_TYPE || tableRow.type === TABLE_EDIT_TYPE)
  && tableColumn.type === TABLE_DATA_TYPE;
export const isAddedTableRow = tableRow => tableRow.type === TABLE_ADDED_TYPE;
export const isEditTableRow = tableRow => tableRow.type === TABLE_EDIT_TYPE;
