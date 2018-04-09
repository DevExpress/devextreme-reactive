import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-vue-grid';

import { TableRow } from '../templates/table-row';
import { TableHeaderCell } from '../templates/table-header-cell';

export const TableHeaderRow = {
  name: 'TableHeaderRow',
  functional: true,
  render(h, context) {
    return (
      <TableHeaderRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};
