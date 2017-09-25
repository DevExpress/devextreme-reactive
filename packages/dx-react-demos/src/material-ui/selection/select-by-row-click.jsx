import React from 'react';
import {
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableSelection,
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
      data: generateData({ length: 6 }),
      selection: [1],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { data, columns, selection } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <TableView />
        <TableSelection
          selectByRowClick
        />
      </Grid>
    );
  }
}
