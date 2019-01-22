import { PureComputed } from '@devexpress/dx-core';
import { Filter } from '../../types';

export const getColumnFilterConfig: PureComputed<
  [Filter[], string], Filter | null
> = (filters, columnName) => {
  if (!filters.length) { return null; }

  const filter = filters.filter(s => s.columnName === columnName)[0];
  if (!filter) return null;

  return filter;
};
