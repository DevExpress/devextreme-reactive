import { TABLE_FILTER_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isFilterTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_FILTER_TYPE && tableColumn.type === TABLE_DATA_TYPE;
