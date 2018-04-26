import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-vue-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';
import { TableRow } from '../templates/table-row';

export const TableRowDetail = {
  name: 'TableRowDetail',
  functional: true,
  render(h, context) {
    return (
      <TableRowDetailBase
        toggleCellComponent={TableDetailToggleCell}
        cellComponent={TableDetailCell}
        rowComponent={TableRow}
        toggleColumnWidth={48}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

TableRowDetail.Cell = TableDetailCell;
TableRowDetail.ToggleCell = TableDetailToggleCell;
TableRowDetail.Row = TableRow;
