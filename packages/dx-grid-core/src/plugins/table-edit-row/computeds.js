export const rowsWithEditing = (rows, editingRows, addedRows, getRowId, rowHeight) => {
  const rowIds = new Set(editingRows);
  const tableRows = rows.map(
    row => (
      rowIds.has(getRowId(row))
      ? {
        type: 'edit',
        _originalRow: row,
        height: rowHeight,
      }
      : row
    ),
  );
  const addedTableRows = addedRows.map((row, index) => ({
    type: 'edit',
    isNew: true,
    index,
    _originalRow: row,
    height: rowHeight,
  }));
  return [
    ...addedTableRows.reverse(),
    ...tableRows,
  ];
};
