import { PureComputed } from '@devexpress/dx-core';
import { GetAvailableFilterOperationsFn, FilterOperation } from '../../types';

export const getAvailableFilterOperationsGetter: PureComputed<
  [GetAvailableFilterOperationsFn, FilterOperation[], string[]]
> = (
  getAvailableFilterOperations,
  availableFilterOperations,
  columnNames,
) => columnName => (columnNames.indexOf(columnName) > -1 && availableFilterOperations)
// tslint:disable-next-line: max-line-length
    || (typeof getAvailableFilterOperations === 'function' && getAvailableFilterOperations(columnName))
    || undefined;
