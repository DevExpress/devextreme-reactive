export const getAvailableToSelect = (rows, getRowId, isGroupRow) => {
  let dataRows = rows;
  if (isGroupRow) {
    dataRows = dataRows.filter(row => !isGroupRow(row));
  }
  return dataRows.map(row => getRowId(row));
};

export const someSelected = ({ selection, availableToSelect }) =>
  availableToSelect.length !== 0 && selection.length !== 0
    && availableToSelect.some(elem => selection.indexOf(elem) !== -1)
    && availableToSelect.some(elem => selection.indexOf(elem) === -1);

export const allSelected = ({ selection, availableToSelect }) =>
  selection.length !== 0 && availableToSelect.length !== 0
    && !availableToSelect.some(elem => selection.indexOf(elem) === -1);
