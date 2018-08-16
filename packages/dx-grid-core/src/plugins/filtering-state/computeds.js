export const filterExpression = (filters, expression) => {
  const selfFilterExpr = { operator: 'and', filters };
  if (!expression) {
    return selfFilterExpr;
  }
  return {
    operator: 'and',
    filters: [expression, selfFilterExpr],
  };
};
