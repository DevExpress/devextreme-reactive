import { TABLE_SELECT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import extendWithEventListener from '../../utils/extend-with-event-listener';

export const tableColumnsWithSelection = (tableColumns, selectionColumnWidth) =>
  [{ type: TABLE_SELECT_TYPE, id: 0, width: selectionColumnWidth }, ...tableColumns];

export const tableRowsWithSelection = (tableRows, selection) => {
  const selectionSet = new Set(selection);
  return tableRows
    .map((tableRow) => {
      if (tableRow.type !== TABLE_DATA_TYPE || !selectionSet.has(tableRow.id)) return tableRow;
      return { selected: true, ...tableRow };
    });
};

export const tableExtraPropsWithSelection = (extraProps, setRowSelection) =>
  extendWithEventListener(extraProps, 'onClick', ({ tableRow: { type, id: rowId } }) => {
    if (type !== TABLE_DATA_TYPE) return;
    setRowSelection({ rowId });
  });
