import { DxTableSelection as DxTableSelectionBase } from '@devexpress/dx-vue-grid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';
import { TableSelectRow } from '../templates/table-select-row';

export const DxTableSelection = {
  name: 'DxTableSelection',
  functional: true,
  render(h, context) {
    return (
      <DxTableSelectionBase
        rowComponent={TableSelectRow}
        cellComponent={TableSelectCell}
        headerCellComponent={TableSelectAllCell}
        selectionColumnWidth={40}
        {...context.data}
      />
    );
  },
  components: {
    DxCell: TableSelectCell,
    DxHeaderCell: TableSelectAllCell,
  },
};
