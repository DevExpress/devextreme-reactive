import { ADD_TYPE, EDIT_TYPE } from './constants';

// TODO: remove getRowId
export const tableRowsWithEditing = (rows, editingRows, addedRows, getRowId, rowHeight) => {
  const rowIds = new Set(editingRows);
  const tableRows = rows
    .map(row => (
      rowIds.has(getRowId(row.original))
      ? {
        ...row,
        type: EDIT_TYPE,
        height: rowHeight,
      }
      : row
    ));

  const addedTableRows = addedRows
    .map((row, rowIndex) => ({
      type: ADD_TYPE,
      id: rowIndex,
      height: rowHeight,
      original: row,
    }));

  return [
    ...addedTableRows,
    ...tableRows,
  ];
};
