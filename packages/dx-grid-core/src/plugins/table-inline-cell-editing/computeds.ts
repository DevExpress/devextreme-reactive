import { TableRowsWithEditingCellsFn, TableColumnsWithEditingCellsFn } from '../../types';

export const rowsWithEditingCells: TableRowsWithEditingCellsFn = (
  tableBodyRows, editingCells,
) => tableBodyRows.map((row) => {
  const { rowId } = row;
  if (rowId !== undefined && editingCells.some(elem => elem.rowId === rowId)) {
    return {
      ...row,
      hasEditCell: true,
    };
  }
  return row;
});

export const columnsWithEditingCells: TableColumnsWithEditingCellsFn = (
  tableColumns, editingCells,
) => tableColumns.map((tableColumn) => {
  const columnName = tableColumn.column ? tableColumn.column.name : undefined;
  if (columnName !== undefined && editingCells.some(elem => elem.columnName === columnName)) {
    return {
      ...tableColumn,
      hasEditCell: true,
    };
  }
  return tableColumn;
});
