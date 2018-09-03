import { DxTableHeaderRow as DxTableHeaderRowBase } from '@devexpress/dx-vue-grid';
import { TableRow } from '../templates/table-row';
import { TableHeaderCell } from '../templates/table-header-cell';

export const DxTableHeaderRow = {
  name: 'DxTableHeaderRow',
  functional: true,
  render(h, context) {
    return (
      <DxTableHeaderRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        {...context.data}
      />
    );
  },
  components: {
    DxCell: TableHeaderCell,
    DxRow: TableRow,
  },
};
