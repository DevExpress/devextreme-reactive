import { ADD_TYPE, EDIT_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';

export const isEditNewTableCell = (row, column) =>
  row.type === ADD_TYPE && column.type === DATA_TYPE;
export const isEditExistingTableCell = (row, column) =>
  row.type === EDIT_TYPE && column.type === DATA_TYPE;
