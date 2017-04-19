export const expandedDetailRows = (sourceRows, expandedRows, rowHeight) => {
  let rows = sourceRows;
  expandedRows.filter((value, index, self) => self.indexOf(value) === index).forEach((rowId) => {
    const index = rows.findIndex(row => row.id === rowId);
    if (index !== -1) {
      const rowIndex = rows.findIndex(row => row.id === rowId);
      const insertIndex = rowIndex + 1;
      const row = rows[rowIndex];
      rows = [
        ...rows.slice(0, insertIndex),
        { type: 'detailRow', id: `detailRow_${row.id}`, for: row, colspan: 0, height: rowHeight },
        ...rows.slice(insertIndex),
      ];
    }
  });
  return rows;
};
