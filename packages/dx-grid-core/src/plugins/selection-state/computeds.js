export const getAvailableToSelect = (gridRows, getGridRowId) =>
  gridRows.filter(gridRow => !gridRow.type).map(gridRow => getGridRowId(gridRow));

export const getAvailableSelection = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected));
};
