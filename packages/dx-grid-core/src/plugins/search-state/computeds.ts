import { SearchFilterExpressionFn, FilterExpression } from '../../types';

export const searchFilterExpression: SearchFilterExpressionFn = (
  searchValue, columns, filterExpression,
) => {
  const filters = columns.map(({ name }) => ({ columnName: name, value: searchValue }));
  const selfFilterExpression: FilterExpression = { filters, operator: 'or' };
  if (!filterExpression) {
    return selfFilterExpression;
  }
  return {
    operator: 'and',
    filters: [filterExpression as FilterExpression, selfFilterExpression],
  };
};
