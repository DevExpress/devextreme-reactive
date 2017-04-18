import React from 'react';
import {
    DataGrid,
    SelectionState,
    PagingState,
    LocalPaging,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    TableView,
    TableSelection,
    PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class SelectionWithHiddenSelectAllDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
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
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <SelectionState
          selection={selection}
          selectionChange={this.changeSelection}
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
      </DataGrid>
    );
  }
}
