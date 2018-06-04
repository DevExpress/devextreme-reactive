import { TABLE_FILTER_TYPE, DEFAULT_FILTER_OPERATIONS } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isFilterTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_FILTER_TYPE && tableColumn.type === TABLE_DATA_TYPE;

export const isFilterTableRow = tableRow => tableRow.type === TABLE_FILTER_TYPE;

export const getColumnFilterOperations = (getAvailableFilterOperations, columnName) =>
  (getAvailableFilterOperations && getAvailableFilterOperations(columnName))
  || DEFAULT_FILTER_OPERATIONS;

export const isFilterValueEmpty = value => value === undefined || !String(value).length;
