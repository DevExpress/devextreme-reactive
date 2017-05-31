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
  generateRows,
} from '../../demoData';

export class SelectAllVirtualDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 1000 }),
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
