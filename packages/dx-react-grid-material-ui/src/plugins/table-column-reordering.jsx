import { withComponents } from '@devexpress/dx-react-core';
import { TableColumnReordering as TableColumnReorderingBase } from '@devexpress/dx-react-grid';
import { TableReorderingCell as Cell } from '../templates/table-reordering-cell';
import { TableInvisibleRow as Row } from '../templates/table-invisible-row';

export const TableColumnReordering = withComponents({ Row, Cell })(TableColumnReorderingBase);
