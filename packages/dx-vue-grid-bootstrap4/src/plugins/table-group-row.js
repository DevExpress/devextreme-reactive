import { DxTableGroupRow as DxTableGroupRowBase } from '@devexpress/dx-vue-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';
import { TableRow } from '../templates/table-row';

export const DxTableGroupRow = {
  name: 'DxTableGroupRow',
  functional: true,
  render(h, context) {
    return (
      <DxTableGroupRowBase
        cellComponent={TableGroupCell}
        rowComponent={TableRow}
        indentColumnWidth={33}
        {...context.data}
      />
    );
  },
  components: {
    DxRow: TableRow,
    DxCell: TableGroupCell,
  },
};
