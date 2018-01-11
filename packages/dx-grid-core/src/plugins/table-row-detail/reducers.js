export const toggleDetailRowExpanded = (prevExpanded, { rowId, state }) => {
  const expandedRowIds = prevExpanded.slice();
  const expandedIndex = expandedRowIds.indexOf(rowId);
  const rowState = state !== undefined ? state : expandedIndex === -1;

  if (expandedIndex > -1 && !rowState) {
    expandedRowIds.splice(expandedIndex, 1);
  } else if (expandedIndex === -1 && rowState) {
    expandedRowIds.push(rowId);
  }

  return expandedRowIds;
};
