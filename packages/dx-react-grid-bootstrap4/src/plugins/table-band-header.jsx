import * as React from 'react';
import { TableBandHeader as TableBandHeaderBase } from '@devexpress/dx-react-grid';
import { Cell } from '../templates/table-band-header/cell';
import { BandedHeaderCell } from '../templates/table-band-header/banded-header-cell';
import { InvisibleCell } from '../templates/table-band-header/invisible-cell';
import { TableRow } from '../templates/table-row';

export class TableBandHeader extends React.PureComponent {
  render() {
    return (
      <TableBandHeaderBase
        cellComponent={Cell}
        rowComponent={TableRow}
        bandedHeaderCellComponent={BandedHeaderCell}
        invisibleCellComponent={InvisibleCell}
        {...this.props}
      />
    );
  }
}

TableBandHeader.Cell = Cell;
TableBandHeader.Row = TableRow;
TableBandHeader.BandedHeaderCell = BandedHeaderCell;
