export const selectAllAvaliable = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected)).length > 0;
};

export const allAvailableInSelection = (availableToSelect, selectionRows) => {
  // let availableInSelection = true;
  // availableToSelect.forEach((elem) => {
  //   if (!selectionRows.has(elem)) {
  //     availableInSelection = false;
  //     return false;
  //   }
  //   return true;
  // });
  // return availableInSelection;
  return !availableToSelect.some(elem => !selectionRows.has(elem));
};

export const consistSelectionInAvailable = (selectionRows, availableToSelect) => {
  // let selectionInAvailable = false;
  // availableToSelect.forEach((elem) => {
  //   if (selectionRows.has(elem)) {
  //     selectionInAvailable = true;
  //     return true;
  //   }
  //   return false;
  // });
  return availableToSelect.some(elem => selectionRows.has(elem));
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
