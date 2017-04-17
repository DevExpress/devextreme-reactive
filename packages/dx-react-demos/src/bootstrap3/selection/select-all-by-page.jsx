import React from 'react';
import {
    DataGrid,
    SelectionState,
    PagingState,
    LocalPaging,
} from '@devexpress/dx-react-datagrid';
import {
    TableView,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class SelectAllByPageDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
      selection: [],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns, selection } = this.state;

    return (
      <div>
        <span>Total rows selected: {selection.length}</span>

        <DataGrid
          rows={rows}
          columns={columns}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={6}
          />
          <LocalPaging />
          <SelectionState
            selection={selection}
            selectionChange={this.changeSelection}
          />
          <TableView />
          <TableHeaderRow />
          <TableSelection />
          <PagingPanel />
        </DataGrid>
      </div>
    );
  }
}
