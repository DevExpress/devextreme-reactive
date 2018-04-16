export const changeSearchValue = (prevSearchValue, searchValue) => searchValue;

export const pushSearchFilterExpression = searchValue => ({ filterExpression, columns }) => {
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
