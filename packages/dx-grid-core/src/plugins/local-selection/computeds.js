export const selectAllAvaliable = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected)).length > 0;
};

export const isSomeSelected = ({ selection, availableToSelect }) => {
  const selectionRows = new Set(selection);
  return availableToSelect.length !== 0 && selection.length !== 0
    && availableToSelect.some(elem => selectionRows.has(elem))
    && availableToSelect.some(elem => !selectionRows.has(elem));
};

export const isAllSelected = ({ selection, availableToSelect }) => {
  const selectionRows = new Set(selection);
  return selection.length !== 0 && availableToSelect.length !== 0
    && !availableToSelect.some(elem => !selectionRows.has(elem));
};
