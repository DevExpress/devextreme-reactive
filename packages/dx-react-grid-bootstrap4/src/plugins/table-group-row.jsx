import * as React from 'react';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';
import { TableRow } from '../templates/table-row';

export class TableGroupRow extends React.PureComponent {
  render() {
    return (
      <TableGroupRowBase
        cellComponent={TableGroupCell}
        rowComponent={TableRow}
        indentColumnWidth={20}
        {...this.props}
      />
    );
  }
}

TableGroupRow.Row = TableRow;
TableGroupRow.Cell = TableGroupCell;
