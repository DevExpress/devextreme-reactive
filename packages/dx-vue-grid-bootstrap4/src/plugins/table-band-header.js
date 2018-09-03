import { DxTableBandHeader as DxTableBandHeaderBase } from '@devexpress/dx-vue-grid';
import { Cell } from '../templates/table-band-header/cell';
import { BandedHeaderCell } from '../templates/table-band-header/banded-header-cell';
import { InvisibleCell } from '../templates/table-band-header/invisible-cell';
import { TableRow } from '../templates/table-row';

export const DxTableBandHeader = {
  name: 'DxTableBandHeader',
  functional: true,
  render(h, context) {
    return (
      <DxTableBandHeaderBase
        cellComponent={Cell}
        rowComponent={TableRow}
        bandedHeaderCellComponent={BandedHeaderCell}
        invisibleCellComponent={InvisibleCell}
        {...context.data}
      />
    );
  },
  components: {
    DxCell: Cell,
    DxRow: TableRow,
    DxBandedHeaderCell: BandedHeaderCell,
  },
};
