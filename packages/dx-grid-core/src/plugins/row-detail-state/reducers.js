export const toggleDetailRowExpanded = (prevExpanded, { rowId, state }) => {
  const expandedDetailRowIds = prevExpanded.slice();
  const expandedIndex = expandedDetailRowIds.indexOf(rowId);
  const rowState = state !== undefined ? state : expandedIndex === -1;

  if (expandedIndex > -1 && !rowState) {
    expandedDetailRowIds.splice(expandedIndex, 1);
  } else if (expandedIndex === -1 && rowState) {
    expandedDetailRowIds.push(rowId);
  }

  return expandedDetailRowIds;
};
