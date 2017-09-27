import React from 'react';
import {
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateData,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      data: generateData({ length: 7 }),
    };

    this.changeExpandedDetails = expandedRows => this.setState({ expandedRows });
    this.rowTemplate = ({ row }) => <div>Details for {row.name} from {row.city}</div>;
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <RowDetailState
          defaultExpandedRows={[2, 5]}
        />
        <TableView />
        <TableHeaderRow />
        <TableRowDetail
          template={this.rowTemplate}
        />
      </Grid>
    );
  }
}
