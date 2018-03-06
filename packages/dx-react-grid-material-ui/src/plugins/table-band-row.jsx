import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';

export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = TableHeaderCell;
TableBandRow.Row = TableRow;
