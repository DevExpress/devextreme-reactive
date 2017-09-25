export const getAvailableToSelect = (rows, getRowDataId) =>
  rows.filter(row => !row.type).map(row => getRowDataId(row));

export const getAvailableSelection = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected));
};
