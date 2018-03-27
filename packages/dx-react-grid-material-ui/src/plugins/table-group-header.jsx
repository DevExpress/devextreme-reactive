import * as React from 'react';
import { TableBandHeader as TableGroupHeaderBase } from '@devexpress/dx-react-grid';
import { Cell } from '../templates/table-band-header/cell';
import { BandedHeaderCell } from '../templates/table-band-header/banded-header-cell';
import { EmptyCell } from '../templates/table-band-header/empty-cell';
import { Row } from '../templates/table-band-header/row';

export class TableBandHeader extends React.PureComponent {
  render() {
    return (
      <TableGroupHeaderBase
        cellComponent={Cell}
        rowComponent={Row}
        bandedHeaderCellComponent={BandedHeaderCell}
        emptyCellComponent={EmptyCell}
        {...this.props}
      />
    );
  }
}

TableBandHeader.Cell = Cell;
TableBandHeader.Row = Row;
TableBandHeader.BandedHeaderCell = BandedHeaderCell;
