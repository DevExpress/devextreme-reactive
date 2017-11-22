export const getAvailableToSelect = (rows, getRowId, isGroupRow) => {
  let dataRows = rows;
  if (isGroupRow) {
    dataRows = dataRows.filter(row => !isGroupRow(row));
  }
  return dataRows.map(row => getRowId(row));
};

export const getAvailableSelection = (selection, availableToSelect) => {
  const availableToSelectSet = new Set(availableToSelect);
  return selection.filter(selected => availableToSelectSet.has(selected));
};

// move to local-selection computeds
// export const selectAllAvaliable = (selection, availableToSelect) => {
//   const availableToSelectSet = new Set(availableToSelect);
//   return selection.filter(selected => availableToSelectSet.has(selected)).length > 0;
// };
