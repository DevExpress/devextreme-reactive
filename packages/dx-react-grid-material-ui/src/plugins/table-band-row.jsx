import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { BandCell } from '../templates/band-cell';
import { BandEmptyCell } from '../templates/band-empty-cell';
import { BandRow } from '../templates/band-row';

export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={BandCell}
        rowComponent={BandRow}
        emptyCellComponent={BandEmptyCell}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = BandCell;
TableBandRow.Row = BandRow;
TableBandRow.EmptyCell = BandEmptyCell;
