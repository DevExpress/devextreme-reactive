import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isBandedTableCell = (tableRow, tableColumn) => {
  debugger;
  const result = tableRow.type === TABLE_BAND_TYPE
  && (tableColumn.type === TABLE_DATA_TYPE || tableColumn.type === 'band')
  && tableRow.level === tableColumn.column.level;

  return result;

};

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);
