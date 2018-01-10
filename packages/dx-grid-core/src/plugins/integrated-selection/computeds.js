export const getAvailableToSelect = (rows, getRowId, isGroupRow) => {
  let dataRows = rows;
  if (isGroupRow) {
    dataRows = dataRows.filter(row => !isGroupRow(row));
  }
  return dataRows.map(row => getRowId(row));
};

export const someSelected = ({ selection, availableToSelect }) => {
  const selectionSet = new Set(selection);

  return availableToSelect.length !== 0 && selectionSet.size !== 0
    && availableToSelect.some(elem => selectionSet.has(elem))
    && availableToSelect.some(elem => !selectionSet.has(elem));
};

export const allSelected = ({ selection, availableToSelect }) => {
  const selectionSet = new Set(selection);

  return selectionSet.size !== 0 && availableToSelect.length !== 0
    && !availableToSelect.some(elem => !selectionSet.has(elem));
};
