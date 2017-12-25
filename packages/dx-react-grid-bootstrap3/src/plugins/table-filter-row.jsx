import React from 'react';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

export class TableFilterRow extends React.PureComponent {
  render() {
    return (
      <TableFilterRowBase
        cellComponent={TableFilterCell}
        rowComponent={TableRow}
        {...this.props}
      />
    );
  }
}

TableFilterRow.Cell = TableFilterCell;
TableFilterRow.Row = TableRow;
