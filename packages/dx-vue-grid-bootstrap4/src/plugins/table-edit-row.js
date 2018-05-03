import { DxTableEditRow as DxTableEditRowBase } from '@devexpress/dx-vue-grid';
import { EditCell } from '../templates/table-edit-cell';
import { TableRow } from '../templates/table-row';

export const DxTableEditRow = {
  name: 'DxTableEditRow',
  functional: true,
  render(h, context) {
    return (
      <DxTableEditRowBase
        cellComponent={EditCell}
        rowComponent={TableRow}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxCell: EditCell,
    DxRow: TableRow,
  },
};
