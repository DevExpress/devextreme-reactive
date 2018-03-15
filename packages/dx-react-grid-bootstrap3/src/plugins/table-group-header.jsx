import * as React from 'react';
import { TableGroupHeader as TableGroupHeaderBase } from '@devexpress/dx-react-grid';
import { BandCell } from '../templates/band-cell';
import { BandHeaderCell } from '../templates/band-header-cell';
import { TableRow } from '../templates/table-row';


export class TableGroupHeader extends React.PureComponent {
  render() {
    return (
      <TableGroupHeaderBase
        cellComponent={BandCell}
        rowComponent={TableRow}
        headerCellComponent={BandHeaderCell}
        {...this.props}
      />
    );
  }
}

TableGroupHeader.Cell = BandCell;
TableGroupHeader.Row = TableRow;
TableGroupHeader.HeaderCell = BandHeaderCell;
