import React from 'react';
import {
  SelectionState,
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
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
      data: generateData({ length: 14 }),
      selection: [],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { data, columns, selection } = this.state;

    return (
      <div>
        <span>Total data selected: {selection.length}</span>

        <Grid
          data={data}
          columns={columns}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={6}
          />
          <LocalPaging />
          <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <TableView />
          <TableHeaderRow />
          <TableSelection />
          <PagingPanel />
        </Grid>
      </div>
    );
  }
}
