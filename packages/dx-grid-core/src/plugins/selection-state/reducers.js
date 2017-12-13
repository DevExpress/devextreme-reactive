const setRowSelection = (selection, { rowId, selected }) => {
  const selectedRows = selection.slice();
  const selectedIndex = selectedRows.indexOf(rowId);

  let isRowSelected = selected;

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

export const setRowsSelection = (selection, { rowIds, selected }) => {
  if (rowIds.length === 1) {
    return setRowSelection(selection, { rowId: rowIds[0], selected });
  }

  const rowIdsSet = new Set(rowIds);

  let isRowsSelected = selected;
  if (isRowsSelected === undefined) {
    const availableSelection = selection.filter(rowId => rowIdsSet.has(rowId));
    isRowsSelected = availableSelection.length !== rowIdsSet.size;
  }

  if (isRowsSelected) {
    const selectionSet = new Set(selection);
    return [
      ...selection,
      ...rowIds.filter(rowId => !selectionSet.has(rowId)),
    ];
  }

  return selection.filter(rowId => !rowIdsSet.has(rowId));
};
