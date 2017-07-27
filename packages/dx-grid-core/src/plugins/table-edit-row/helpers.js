import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isEditNewTableCell = (row, column) =>
  row.type === TABLE_ADDING_TYPE && column.type === TABLE_DATA_TYPE;
export const isEditExistingTableCell = (row, column) =>
  row.type === TABLE_EDITING_TYPE && column.type === TABLE_DATA_TYPE;
