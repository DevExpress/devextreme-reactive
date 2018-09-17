import { TableEditRow as TableEditRowBase, withComponents } from '@devexpress/dx-react-grid';
import { EditCell as Cell } from '../templates/table-edit-cell';
import { TableRow as Row } from '../templates/table-row';

export const TableEditRow = withComponents({ Row, Cell })(TableEditRowBase);
