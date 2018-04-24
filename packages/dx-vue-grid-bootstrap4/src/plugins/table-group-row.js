import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-vue-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';
import { TableRow } from '../templates/table-row';

export const TableGroupRow = {
  name: 'TableGroupRow',
  functional: true,
  render(h, context) {
    return (
      <TableGroupRowBase
        cellComponent={TableGroupCell}
        rowComponent={TableRow}
        indentColumnWidth={48}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

TableGroupRow.Row = TableRow;
TableGroupRow.Cell = TableGroupCell;

