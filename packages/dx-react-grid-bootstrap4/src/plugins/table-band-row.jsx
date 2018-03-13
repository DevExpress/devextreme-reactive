import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { BandCell } from '../templates/band-cell';
import { TableRow } from '../templates/table-row';
import { BandEmptyCell } from '../templates/band-empty-cell';
import { BandStubCell } from '../templates/band-stub-cell';
import { BandHeaderCell } from '../templates/band-header-cell';

export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={BandCell}
        rowComponent={TableRow}
        headerCellComponent={BandHeaderCell}
        emptyCellComponent={BandEmptyCell}
        stubCellComponent={BandStubCell}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = BandCell;
TableBandRow.Row = TableRow;
