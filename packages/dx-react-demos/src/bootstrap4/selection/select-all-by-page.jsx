import React from 'react';
import {
  SelectionState, PagingState,
  IntegratedPaging, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from './../../../../dx-react-grid-bootstrap4/src';

import {
  generateRows,
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
      rows: generateRows({ length: 8 }),
      selection: [],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns, selection } = this.state;

    return (
      <div>
        <span>Total rows selected: {selection.length}</span>

        <Grid
          rows={rows}
          columns={columns}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={6}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <IntegratedPaging />
          <IntegratedSelection />
          <Table />
          <TableHeaderRow />
          <TableSelection showSelectAll />
          <PagingPanel />
        </Grid>
      </div>
    );
  }
}
