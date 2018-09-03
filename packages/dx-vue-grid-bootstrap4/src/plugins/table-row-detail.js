import { DxTableRowDetail as DxTableRowDetailBase } from '@devexpress/dx-vue-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';
import { TableRow } from '../templates/table-row';

export const DxTableRowDetail = {
  name: 'DxTableRowDetail',
  functional: true,
  render(h, context) {
    return (
      <DxTableRowDetailBase
        toggleCellComponent={TableDetailToggleCell}
        cellComponent={TableDetailCell}
        rowComponent={TableRow}
        toggleColumnWidth={48}
        {...context.data}
      />
    );
  },
  components: {
    DxCell: TableDetailCell,
    DxToggleCell: TableDetailToggleCell,
    DxRow: TableRow,
  },
};
