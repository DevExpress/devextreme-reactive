import { withComponents } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { EditCell as Cell } from '../templates/table-edit-cell';
import { TableRow as Row } from '../templates/table-row';

export const TableEditRow = withComponents({ Row, Cell })(TableEditRowBase);

TableEditRow.ADDED_ROW_TYPE = TableEditRowBase.ADDED_ROW_TYPE;
TableEditRow.EDIT_ROW_TYPE = TableEditRowBase.EDIT_ROW_TYPE;
