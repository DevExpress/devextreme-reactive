import * as React from 'react';
import { TableGroupHeader as TableGroupHeaderBase } from '@devexpress/dx-react-grid';
import { BandCell } from '../templates/band-cell';
import { BandRow } from '../templates/band-row';
import { BandHeaderCell } from '../templates/band-header-cell';

export class TableGroupHeader extends React.PureComponent {
  render() {
    return (
      <TableGroupHeaderBase
        cellComponent={BandCell}
        rowComponent={BandRow}
        headerCellComponent={BandHeaderCell}
        {...this.props}
      />
    );
  }
}

TableGroupHeader.Cell = BandCell;
TableGroupHeader.Row = BandRow;
TableGroupHeader.HeaderCell = BandHeaderCell;
