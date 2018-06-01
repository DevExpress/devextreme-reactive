export const getAvailableFilterOperationsGetter = (
  getAvailableFilterOperations,
  availableFilterOperations,
  columnNames,
) =>
  columnName => (columnNames.indexOf(columnName) > -1 && availableFilterOperations)
    || (typeof getAvailableFilterOperations === 'function' && getAvailableFilterOperations(columnName))
    || undefined;
