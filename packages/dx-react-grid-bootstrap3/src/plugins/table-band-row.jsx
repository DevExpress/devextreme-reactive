import * as React from 'react';
import { TableBandRow as TableBandRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';
import { Table } from '../templates/table';

const TableComponent = props => <Table use="head" {...props} />;

export class TableBandRow extends React.PureComponent {
  render() {
    return (
      <TableBandRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        {...this.props}
      />
    );
  }
}

TableBandRow.Cell = TableHeaderCell;
TableBandRow.Row = TableRow;
