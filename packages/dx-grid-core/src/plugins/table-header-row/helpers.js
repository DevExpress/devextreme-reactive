import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isHeadingTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === TABLE_DATA_TYPE;
