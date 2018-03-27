import * as React from 'react';
import { TableBandHeader as TableBandHeaderBase } from '@devexpress/dx-react-grid';
import { Cell } from '../templates/table-band-header/cell';
import { BandedHeaderCell } from '../templates/table-band-header/banded-header-cell';
import { EmptyCell } from '../templates/table-band-header/empty-cell';
import { TableRow } from '../templates/table-row';

export class TableBandHeader extends React.PureComponent {
  render() {
    return (
      <TableBandHeaderBase
        cellComponent={Cell}
        rowComponent={TableRow}
        bandedHeaderCellComponent={BandedHeaderCell}
        emptyCellComponent={EmptyCell}
        {...this.props}
      />
    );
  }
}

TableBandHeader.Cell = Cell;
TableBandHeader.Row = TableRow;
TableBandHeader.BandedHeaderCell = BandedHeaderCell;
