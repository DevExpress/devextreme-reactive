import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';

// TODO: remove getRowId
export const tableRowsWithEditing = (tableRows, editingRows, addedRows, getRowId, rowHeight) => {
  const rowIds = new Set(editingRows);
  const editedTableRows = tableRows
    .map(tableRow => (
      rowIds.has(getRowId(tableRow.row))
      ? {
        ...tableRow,
        type: TABLE_EDITING_TYPE,
        height: rowHeight,
      }
      : tableRow
    ));

  const addedTableRows = addedRows
    .map((row, rowIndex) => ({
      type: TABLE_ADDING_TYPE,
      id: rowIndex,
      height: rowHeight,
      row,
    }));

  return [
    ...addedTableRows,
    ...editedTableRows,
  ];
};
