import { TABLE_SELECT_TYPE } from './constants';
import extendWithEventListener from '../../utils/extend-with-event-listener';

export const tableColumnsWithSelection = (columns, selectionColumnWidth) =>
  [{ type: TABLE_SELECT_TYPE, id: 0, width: selectionColumnWidth }, ...columns];

// TODO: remove getRowId
export const tableBodyRowsWithSelection = (bodyRows, selection, getRowId) => {
  const selectionSet = new Set(selection);
  return bodyRows
    .map((row) => {
      if (!selectionSet.has(getRowId(row.original))) return row;
      return { selected: true, ...row };
    });
};

// TODO: remove getRowId
export const tableExtraPropsWithSelection = (
  extraProps,
  setRowSelection,
  getRowId,
) => extendWithEventListener(extraProps, 'onClick', ({ row }) => {
  const rowId = getRowId(row.original);
  if (rowId === undefined) return;
  setRowSelection({ rowId });
});
