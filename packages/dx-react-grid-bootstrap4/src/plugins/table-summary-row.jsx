import { withComponents } from '@devexpress/dx-react-core';
import { TableSummaryRow as TableSummaryRowBase } from '@devexpress/dx-react-grid';
import { TableSummaryItem } from '../templates/table-summary-item';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableTreeIndent } from '../templates/table-tree-indent';
import { TableTreeContent } from '../templates/table-tree-content';
import { TableTreeCell } from '../templates/table-tree-cell';

export const TableSummaryRow = withComponents({
  TotalRow: TableRow,
  GroupRow: TableRow,
  TreeRow: TableRow,
  TotalCell: TableCell,
  GroupCell: TableCell,
  TreeCell: TableCell,
  TableTreeCell,
  TableTreeContent,
  TableTreeIndent,
  Item: TableSummaryItem,
})(TableSummaryRowBase);

TableSummaryRow.TREE_ROW_TYPE = TableSummaryRowBase.TREE_ROW_TYPE;
TableSummaryRow.GROUP_ROW_TYPE = TableSummaryRowBase.GROUP_ROW_TYPE;
TableSummaryRow.TOTAL_ROW_TYPE = TableSummaryRowBase.TOTAL_ROW_TYPE;
