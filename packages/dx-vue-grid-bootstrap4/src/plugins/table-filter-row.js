import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-vue-grid';

import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

export const TableFilterRow = {
  name: 'TableFilterRow',
  functional: true,
  render(h, context) {
    return (
      <TableFilterRowBase
        cellComponent={TableFilterCell}
        rowComponent={TableRow}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

TableFilterRow.Cell = TableFilterCell;
TableFilterRow.Row = TableRow;
