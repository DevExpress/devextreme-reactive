export const getAvailableToSelect = (rows, getRowId) =>
  rows.filter(row => !row.type).map(row => getRowId(row));

export const getAvailableSelection = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected));
};
