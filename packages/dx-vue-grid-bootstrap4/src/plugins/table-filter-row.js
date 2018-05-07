import { DxTableFilterRow as DxTableFilterRowBase } from '@devexpress/dx-vue-grid';

import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

export const DxTableFilterRow = {
  name: 'DxTableFilterRow',
  functional: true,
  render(h, context) {
    return (
      <DxTableFilterRowBase
        cellComponent={TableFilterCell}
        rowComponent={TableRow}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxCell: TableFilterCell,
    DxRow: TableRow,
  },
};
