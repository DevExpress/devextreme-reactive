import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableRowDetail,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class SimpleDetailRowDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(7),
    };

    this.changeExpandedDetails = expandedDetails => this.setState({ expandedDetails });
    this.rowTemplate = ({ row }) => <div>Details for {row.name} from {row.city}</div>;
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <TableView />
        <TableHeaderRow />
        <TableRowDetail
          defaultExpandedDetails={[2, 5]}
          template={this.rowTemplate}
        />
      </DataGrid>
    );
  }
}
