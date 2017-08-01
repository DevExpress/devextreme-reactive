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
