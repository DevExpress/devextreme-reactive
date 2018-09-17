import { TableColumnReordering as TableColumnReorderingBase, withComponents } from '@devexpress/dx-react-grid';
import { TableInvisibleRow as Row } from '../templates/table-invisible-row';
import { TableReorderingCell as Cell } from '../templates/table-reordering-cell';

export const TableColumnReordering = withComponents({ Row, Cell })(TableColumnReorderingBase);
