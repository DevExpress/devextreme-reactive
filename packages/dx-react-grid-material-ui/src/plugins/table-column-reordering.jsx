import { TableColumnReordering as TableColumnReorderingBase, withComponents } from '@devexpress/dx-react-grid';
import { TableReorderingCell as Cell } from '../templates/table-reordering-cell';
import { TableInvisibleRow as Row } from '../templates/table-invisible-row';

export const TableColumnReordering = withComponents({ Row, Cell })(TableColumnReorderingBase);
