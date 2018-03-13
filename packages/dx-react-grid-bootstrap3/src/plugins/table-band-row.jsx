import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { BandCell } from '../templates/band-cell';
import { BandHeaderCell } from '../templates/band-header-cell';
import { BandEmptyCell } from '../templates/band-empty-cell';
import { BandStubCell } from '../templates/band-stub-cell';
import { TableRow } from '../templates/table-row';


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

TableBandRow.Cell = TableHeaderCell;
TableBandRow.Row = TableRow;
