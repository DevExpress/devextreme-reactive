import { FilterExpression, Filter } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export const filterExpression: PureComputed<
  [Filter[], FilterExpression?], FilterExpression
> = (filters, expression) => {
  // tslint:disable-next-line: no-object-literal-type-assertion
  const selfFilterExpr = { filters, operator: 'and' as 'and' } as FilterExpression;
  if (!expression) {
    return selfFilterExpr;
  }
  return {
    operator: 'and' as 'and',
    filters: [expression, selfFilterExpr] as FilterExpression[],
  };
};
