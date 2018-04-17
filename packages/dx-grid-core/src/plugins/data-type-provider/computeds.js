export const filterOperations = (definedFilterOperations, targetFilterOperations, columnNames) => ({
  ...definedFilterOperations,
  ...columnNames.reduce((acc, columnName) => {
    acc[columnName] = targetFilterOperations;
    return acc;
  }, {}),
});
