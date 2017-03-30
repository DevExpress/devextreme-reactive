export const setDetailRowExpanded = (prevExpanded, { rowId, isExpanded }) => {
  const expandedRows = prevExpanded.slice();
  const expandedIndex = expandedRows.indexOf(rowId);
  const isRowExpanded = isExpanded !== undefined ? isExpanded : expandedIndex === -1;

  if (expandedIndex > -1 && !isRowExpanded) {
    expandedRows.splice(expandedIndex, 1);
  } else if (expandedIndex === -1 && isRowExpanded) {
    expandedRows.push(rowId);
  }

  return expandedRows;
};
