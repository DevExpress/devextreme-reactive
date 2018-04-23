import { TableSelection as TableSelectionBase } from '@devexpress/dx-vue-grid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';
import { TableSelectRow } from '../templates/table-select-row';

export const TableSelection = {
  name: 'TableSelection',
  functional: true,
  render(h, context) {
    return (
      <TableSelectionBase
        rowComponent={TableSelectRow}
        cellComponent={TableSelectCell}
        headerCellComponent={TableSelectAllCell}
        selectionColumnWidth={40}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

TableSelection.Cell = TableSelectCell;
TableSelection.HeaderCell = TableSelectAllCell;
