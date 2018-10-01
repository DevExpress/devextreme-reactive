import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const tableRowsWithEditing = (tableRows, editingRowIds, addedRows, rowHeight) => {
  const rowIds = new Set(editingRowIds);
  const editedTableRows = tableRows
    .map(tableRow => (
      tableRow.type === TABLE_DATA_TYPE && rowIds.has(tableRow.rowId)
        ? {
          ...tableRow,
          type: TABLE_EDIT_TYPE,
          height: rowHeight,
        }
        : tableRow
    ));

  const addedTableRows = addedRows
    .map((row, rowIndex) => ({
      key: `${TABLE_ADDED_TYPE.toString()}_${rowIndex}`,
      type: TABLE_ADDED_TYPE,
      rowId: rowIndex,
      height: rowHeight,
      row,
    }));

  return [
    ...addedTableRows.reverse(),
    ...editedTableRows,
  ];
};
