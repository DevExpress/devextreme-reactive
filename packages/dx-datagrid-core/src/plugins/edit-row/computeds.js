export const rowsWithEditing = (rows, editingRows, newRows) => {
  const rowIds = new Set(editingRows);
  const tableRows = rows.map(row => (rowIds.has(row.id) ? { type: 'edit', dataRow: row } : row));
  const newTableRows = newRows.map((row, index) => ({
    type: 'edit',
    isNew: true,
    id: index,
    dataRow: row,
  }));
  return [
    ...newTableRows,
    ...tableRows,
  ];
};
