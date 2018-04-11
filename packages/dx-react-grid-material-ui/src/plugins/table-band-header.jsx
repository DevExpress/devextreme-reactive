import * as React from 'react';
import { TableBandHeader as TableBandHeaderBase } from '@devexpress/dx-react-grid';
import { Cell } from '../templates/table-band-header/cell';
import { BandedHeaderCell } from '../templates/table-band-header/banded-header-cell';
import { InvisibleCell } from '../templates/table-band-header/invisible-cell';
import { Row } from '../templates/table-band-header/row';

export class TableBandHeader extends React.PureComponent {
  render() {
    return (
      <TableBandHeaderBase
        cellComponent={Cell}
        rowComponent={Row}
        bandedHeaderCellComponent={BandedHeaderCell}
        invisibleCellComponent={InvisibleCell}
        {...this.props}
      />
    );
  }
}

TableBandHeader.Cell = Cell;
TableBandHeader.Row = Row;
TableBandHeader.BandedHeaderCell = BandedHeaderCell;
