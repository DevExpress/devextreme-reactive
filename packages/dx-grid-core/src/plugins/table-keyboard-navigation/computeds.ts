import {
    FocusedElement, TableRow,
} from '../../types';

export const getFocusing = (tableBodyRows: TableRow[], focusedElement?: FocusedElement) => {
  if (!focusedElement) {
    return [];
  }
  const focusedRow = tableBodyRows.find((row) => {
    return row.key === focusedElement.rowKey;
  });
  return focusedRow ? [focusedRow.rowId] : [];
};
