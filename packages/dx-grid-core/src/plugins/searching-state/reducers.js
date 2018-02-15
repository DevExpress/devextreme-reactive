export const changeSearchValue = (prevSearchValue, { searchValue }) => searchValue;

export const pushSearchFilterExpr = searchValue => ({ filterExpr, columns }) => {
  const filters = columns.map(({ name }) => ({ columnName: name, value: searchValue }));
  const selfFilterExpr = { operator: 'or', filters };
  if (!filterExpr) {
    return selfFilterExpr;
  }
  return {
    operator: 'and',
    filters: [filterExpr, selfFilterExpr],
  };
};
