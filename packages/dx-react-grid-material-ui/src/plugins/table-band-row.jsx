import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { BandCell } from '../templates/band-cell';
import { BandRow } from '../templates/band-row';
import { BandEmptyCell } from '../templates/band-empty-cell';
import { BandStubCell } from '../templates/band-stub-cell';
import { BandHeaderCell } from '../templates/band-header-cell';

export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={BandCell}
        rowComponent={BandRow}
        headerCellComponent={BandHeaderCell}
        emptyCellComponent={BandEmptyCell}
        stubCellComponent={BandStubCell}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = BandCell;
TableBandRow.EmptyCell = BandEmptyCell;
