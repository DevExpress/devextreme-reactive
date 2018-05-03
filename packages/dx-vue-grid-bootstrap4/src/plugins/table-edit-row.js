import { TableEditRow as TableEditRowBase } from '@devexpress/dx-vue-grid';
import { EditCell } from '../templates/table-edit-cell';
import { TableRow } from '../templates/table-row';

export const TableEditRow = {
  name: 'TableEditRow',
  functional: true,
  render(h, context) {
    return (
      <TableEditRowBase
        cellComponent={EditCell}
        rowComponent={TableRow}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};
