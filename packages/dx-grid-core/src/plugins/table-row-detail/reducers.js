export const setDetailRowExpanded = (prevExpanded, { rowId, isExpanded }) => {
  const expandedRowIds = prevExpanded.slice();
  const expandedIndex = expandedRowIds.indexOf(rowId);
  const isRowExpanded = isExpanded !== undefined ? isExpanded : expandedIndex === -1;

  if (expandedIndex > -1 && !isRowExpanded) {
    expandedRowIds.splice(expandedIndex, 1);
  } else if (expandedIndex === -1 && isRowExpanded) {
    expandedRowIds.push(rowId);
  }

  return expandedRowIds;
};
