import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isEditNewTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_ADDING_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isEditExistingTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_EDITING_TYPE && tableColumn.type === TABLE_DATA_TYPE;
