export const getAvailableToSelect = (rows, getRowId, isGroupRow) => {
  let dataRows = rows;
  if (isGroupRow) {
    dataRows = dataRows.filter(row => !isGroupRow(row));
  }
  return dataRows.map(row => getRowId(row));
};

export const isSomeSelected = ({ selection, availableToSelect }) =>
  availableToSelect.length !== 0 && selection.size !== 0
    && availableToSelect.some(elem => selection.has(elem))
    && availableToSelect.some(elem => !selection.has(elem));

export const isAllSelected = ({ selection, availableToSelect }) =>
  selection.size !== 0 && availableToSelect.length !== 0
    && !availableToSelect.some(elem => !selection.has(elem));
