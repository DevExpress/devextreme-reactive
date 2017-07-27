import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';

// TODO: remove getRowId
export const tableRowsWithEditing = (rows, editingRows, addedRows, getRowId, rowHeight) => {
  const rowIds = new Set(editingRows);
  const tableRows = rows
    .map(row => (
      rowIds.has(getRowId(row.original))
      ? {
        ...row,
        type: TABLE_EDITING_TYPE,
        height: rowHeight,
      }
      : row
    ));

  const addedTableRows = addedRows
    .map((row, rowIndex) => ({
      type: TABLE_ADDING_TYPE,
      id: rowIndex,
      height: rowHeight,
      original: row,
    }));

  return [
    ...addedTableRows,
    ...tableRows,
  ];
};
