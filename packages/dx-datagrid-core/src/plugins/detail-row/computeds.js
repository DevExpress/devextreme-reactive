export const expandedDetailRows = (sourceRows, expandedRows, getRowId) => {
  let rows = sourceRows;
  expandedRows
    .forEach((expandedRowId) => {
      const index = rows.findIndex(row => getRowId(row) === expandedRowId);
      if (index !== -1) {
        const rowIndex = rows.findIndex(row => getRowId(row) === expandedRowId);
        const insertIndex = rowIndex + 1;
        const row = rows[rowIndex];
        rows = [
          ...rows.slice(0, insertIndex),
          { type: 'detailRow', id: getRowId(row), for: row, colspan: 0, height: 'auto' },
          ...rows.slice(insertIndex),
        ];
      }
    });
  return rows;
};
