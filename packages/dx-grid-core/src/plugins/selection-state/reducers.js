export const setRowSelection = (selection, { rowId, isSelected }) => {
  const selectedRows = Array.from(selection);
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

export const setRowsSelection = (selection, { rowIds, isSelected }) => {
  const rowIdsSet = new Set(rowIds);

  let isRowsSelected = isSelected;
  if (isRowsSelected === undefined) {
    const availableSelection = selection.filter(selected => rowIdsSet.has(selected));
    isRowsSelected = availableSelection.length !== rowIdsSet.size;
  }

  if (isRowsSelected) {
    const selectionSet = new Set(selection);
    return [
      ...selection,
      ...rowIds.filter(selected => !selectionSet.has(selected)),
    ];
  }

  return selection.filter(selected => !rowIdsSet.has(selected));
};
