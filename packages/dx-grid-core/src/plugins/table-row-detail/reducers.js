export const toggleDetailRowExpanded = (prevExpanded, { rowId, state }) => {
  const expandedRows = prevExpanded.slice();
  const expandedIndex = expandedRows.indexOf(rowId);
  const rowState = state !== undefined ? state : expandedIndex === -1;

  if (expandedIndex > -1 && !rowState) {
    expandedRows.splice(expandedIndex, 1);
  } else if (expandedIndex === -1 && rowState) {
    expandedRows.push(rowId);
  }

  return expandedRows;
};
