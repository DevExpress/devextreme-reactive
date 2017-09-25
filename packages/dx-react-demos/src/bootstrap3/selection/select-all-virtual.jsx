import React from 'react';
import {
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTableView,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap3';

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
      data: generateData({ length: 1000 }),
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
          <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <VirtualTableView />
          <TableHeaderRow />
          <TableSelection />
        </Grid>
      </div>
    );
  }
}
