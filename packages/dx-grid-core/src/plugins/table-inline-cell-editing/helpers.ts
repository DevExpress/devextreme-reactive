import { IsSpecificCellFn, EditingCell } from '../../types';

export const isInlineEditTableCell: IsSpecificCellFn = (
  tableRow, tableColumn, editingCells: EditingCell[],
) => (
  editingCells.some(({ rowId, columnName }) =>
    rowId === tableRow.rowId && tableColumn.column!.name === columnName,
  )
);
