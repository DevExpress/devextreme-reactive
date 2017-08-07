import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const tableRowsWithEditing = (tableRows, editingRows, addedRows, rowHeight) => {
  const rowIds = new Set(editingRows);
  const editedTableRows = tableRows
    .map(tableRow => (
      tableRow.type === TABLE_DATA_TYPE && rowIds.has(tableRow.rowId)
      ? {
        ...tableRow,
        key: `${TABLE_EDITING_TYPE}_${tableRow.rowId}`,
        type: TABLE_EDITING_TYPE,
        height: rowHeight,
      }
      : tableRow
    ));

  const addedTableRows = addedRows
    .map((row, rowIndex) => ({
      key: `${TABLE_ADDING_TYPE}_${rowIndex}`,
      type: TABLE_ADDING_TYPE,
      rowId: rowIndex,
      height: rowHeight,
      row,
    }));

  return [
    ...addedTableRows.reverse(),
    ...editedTableRows,
  ];
};
