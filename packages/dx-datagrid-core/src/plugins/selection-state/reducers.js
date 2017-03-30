export const setRowSelection = (selection, { rowId, isSelected }) => {
  const selectedRows = selection.slice();
  const selectedIndex = selectedRows.indexOf(rowId);
  let isRowSelected = isSelected;

  if (isRowSelected === undefined) {
    isRowSelected = selectedIndex === -1;
  }

  if (selectedIndex > -1 && !isRowSelected) {
    selectedRows.splice(selectedIndex, 1);
  } else if (selectedIndex === -1 && isRowSelected) {
    selectedRows.push(rowId);
  }

  return selectedRows;
};

export const toggleSelectAll = (selection, { rows, getRowId }) => {
  if (selection.length === rows.length) {
    return [];
  }
  return rows.map(getRowId);
};
