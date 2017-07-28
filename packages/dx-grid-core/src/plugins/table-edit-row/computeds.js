import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const tableRowsWithEditing = (tableRows, editingRows, addedRows, rowHeight) => {
  const rowIds = new Set(editingRows);
  const editedTableRows = tableRows
    .map(tableRow => (
      tableRow.type === TABLE_DATA_TYPE && rowIds.has(tableRow.id)
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
