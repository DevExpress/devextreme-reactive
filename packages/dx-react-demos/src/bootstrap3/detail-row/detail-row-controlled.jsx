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

export class DetailRowControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(7),
      expandedDetails: [2, 5],
    };

    this.changeExpandedDetails = expandedDetails => this.setState({ expandedDetails });
    this.rowTemplate = ({ row }) => <div>Details for {row.name} from {row.city}</div>;
  }
  render() {
    const { rows, columns, expandedDetails } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <TableView />
        <TableHeaderRow />
        <TableRowDetail
          expandedDetails={expandedDetails}
          expandedDetailsChange={this.changeExpandedDetails}
          template={this.rowTemplate}
        />
      </DataGrid>
    );
  }
}
