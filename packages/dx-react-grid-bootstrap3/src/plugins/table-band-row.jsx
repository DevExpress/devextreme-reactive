import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { BandCell } from '../templates/band-cell';
import { TableRow } from '../templates/table-row';
import { BandEmptyCell } from '../templates/band-empty-cell';


export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={BandCell}
        rowComponent={TableRow}
        emptyCellComponent={BandEmptyCell}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = TableHeaderCell;
TableBandRow.Row = TableRow;
