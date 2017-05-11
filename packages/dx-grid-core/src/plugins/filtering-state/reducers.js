export const setColumnFilter = (filters, { columnName, config }) => {
  const filterIndex = filters.findIndex(f => f.column === columnName);
  const nextState = filters.slice();

  if (config) {
    const filter = { column: columnName, ...config };
    if (filterIndex > -1) {
      nextState.splice(filterIndex, 1, filter);
    } else {
      nextState.push(filter);
    }
  } else {
    nextState.splice(filterIndex, 1);
  }

  return nextState;
};
