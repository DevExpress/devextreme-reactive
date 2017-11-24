export const getAvailableToSelect = (rows, getRowId, isGroupRow) => {
  let dataRows = rows;
  if (isGroupRow) {
    dataRows = dataRows.filter(row => !isGroupRow(row));
  }
  return dataRows.map(row => getRowId(row));
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
