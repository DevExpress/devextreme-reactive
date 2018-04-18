import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-vue-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';
import { TableRow } from '../templates/table-row';

export const TableGroupRow = {
  render() {
    return (
      <TableGroupRowBase
        cellComponent={TableGroupCell}
        rowComponent={TableRow}
        indentColumnWidth={48}
      />
    );
  },
};

TableGroupRow.Row = TableRow;
TableGroupRow.Cell = TableGroupCell;

