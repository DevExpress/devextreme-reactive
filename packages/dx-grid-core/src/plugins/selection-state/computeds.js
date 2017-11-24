export const getAvailableSelection = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected));
};
