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
  generateRows,
} from '../../demoData';

export class SelectionWithHiddenSelectAllDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
      selection: [],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns, selection } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <PagingState
          defaultCurrentPage={0}
          pageSize={6}
        />
        <LocalPaging />
        <TableView />
        <TableHeaderRow />
        <TableSelection
          showSelectAll={false}
        />
        <PagingPanel />
      </Grid>
    );
  }
}
