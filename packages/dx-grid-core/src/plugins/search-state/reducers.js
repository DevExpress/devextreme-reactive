export const changeSearchValue = (prevSearchValue, searchValue) => searchValue;

export const pushSearchFilterExpression = searchValue => ({ filterExpression, columns }) => {
  const filters = columns.map(({ name }) => ({ columnName: name, value: searchValue }));
  const selfFilterExpr = { operator: 'or', filters };
  if (!filterExpression) {
    return selfFilterExpr;
  }
  return {
    operator: 'and',
    filters: [filterExpression, selfFilterExpr],
  };
};
