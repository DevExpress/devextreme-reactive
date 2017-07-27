import { TABLE_SELECT_TYPE } from './constants';
import extendWithEventListener from '../../utils/extend-with-event-listener';

export const tableColumnsWithSelection = (tableColumns, selectionColumnWidth) =>
  [{ type: TABLE_SELECT_TYPE, id: 0, width: selectionColumnWidth }, ...tableColumns];

// TODO: remove getRowId
export const tableRowsWithSelection = (tableRows, selection, getRowId) => {
  const selectionSet = new Set(selection);
  return tableRows
    .map((tableRow) => {
      if (!selectionSet.has(getRowId(tableRow.row))) return tableRow;
      return { selected: true, ...tableRow };
    });
};

// TODO: remove getRowId
export const tableExtraPropsWithSelection = (
  extraProps,
  setRowSelection,
  getRowId,
) => extendWithEventListener(extraProps, 'onClick', ({ tableRow }) => {
  const rowId = getRowId(tableRow.row);
  if (rowId === undefined) return;
  setRowSelection({ rowId });
});
