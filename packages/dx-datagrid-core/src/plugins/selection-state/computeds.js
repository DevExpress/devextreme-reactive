export const getAvailableToSelect = rows =>
  rows.filter(row => !row.type).map(row => row.id);

export const getAvailableSelection = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected));
};
