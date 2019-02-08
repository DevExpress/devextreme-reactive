import { PureComputed } from '@devexpress/dx-core';
import { TABLE_FILTER_TYPE, DEFAULT_FILTER_OPERATIONS } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  IsSpecificCellFn, IsSpecificRowFn, FilterOperation, GetAvailableFilterOperationsFn,
  GetSelectedFilterOperationFn,
} from '../../types';

export const isFilterTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_FILTER_TYPE && tableColumn.type === TABLE_DATA_TYPE;

export const isFilterTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_FILTER_TYPE;

export const getColumnFilterOperations: PureComputed<
  [GetAvailableFilterOperationsFn, string],
  FilterOperation[]
> = (
  getAvailableFilterOperations, columnName,
) => (getAvailableFilterOperations && getAvailableFilterOperations(columnName))
  || DEFAULT_FILTER_OPERATIONS;

export const isFilterValueEmpty = (value: any) => value === undefined || !String(value).length;

export const getSelectedFilterOperation: GetSelectedFilterOperationFn = (
  filterOperations, columnName, columnFilter, columnFilterOperations,
) => {
  if (columnFilter && columnFilter.operation) {
    return columnFilter.operation;
  }
  if (filterOperations[columnName]) {
    return filterOperations[columnName];
  }
  return columnFilterOperations[0];
};
