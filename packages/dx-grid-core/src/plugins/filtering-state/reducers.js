export const setColumnFilter = (filters, { columnName, config }) => {
  const filterIndex = filters.findIndex(f => f.columnName === columnName);
  const nextState = filters.slice();

  if (config) {
    const filter = { columnName, ...config };
    if (filterIndex > -1) {
      const args = config.value ? [filterIndex, 1, filter] : [filterIndex, 1];
      nextState.splice(...args);
    } else {
      nextState.push(filter);
    }
  } else {
    nextState.splice(filterIndex, 1);
  }

  return nextState;
};
