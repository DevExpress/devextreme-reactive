export const toggleSelection = (selection, { rowIds, state }) => {
  const rowIdsSet = new Set(rowIds);

  let rowsState = state;
  if (rowsState === undefined) {
    const availableSelection = selection.filter(rowId => rowIdsSet.has(rowId));
    rowsState = availableSelection.length !== rowIdsSet.size;
  }

  if (rowsState) {
    const selectionSet = new Set(selection);
    return [
      ...selection,
      ...rowIds.filter(rowId => !selectionSet.has(rowId)),
    ];
  }

  return selection.filter(rowId => !rowIdsSet.has(rowId));
};
