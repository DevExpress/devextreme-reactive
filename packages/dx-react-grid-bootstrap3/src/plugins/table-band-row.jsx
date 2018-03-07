import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';

export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={TableCell}
        rowComponent={TableRow}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = TableCell;
TableBandRow.Row = TableRow;
