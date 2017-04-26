export const rowsWithEditing = (rows, editingRows, newRows, getRowId) => {
  const rowIds = new Set(editingRows);
  const tableRows = rows.map(row => (rowIds.has(getRowId(row)) ? { type: 'edit', _originalRow: row } : row));
  const newTableRows = newRows.map((row, index) => ({
    type: 'edit',
    isNew: true,
    index,
    _originalRow: row,
  }));
  return [
    ...newTableRows,
    ...tableRows,
  ];
};
