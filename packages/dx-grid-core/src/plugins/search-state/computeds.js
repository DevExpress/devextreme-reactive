export const searchFilterExpression = (searchValue, columns, filterExpression) => {
  const filters = columns.map(({ name }) => ({ columnName: name, value: searchValue }));
  const selfFilterExpression = { operator: 'or', filters };
  if (!filterExpression) {
    return selfFilterExpression;
  }
  return {
    operator: 'and',
    filters: [filterExpression, selfFilterExpression],
  };
};
