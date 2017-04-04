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
    TableColumnSelection,
    PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class SelectAllByAllPagesDemo extends React.PureComponent {
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
        <h3>Select All by All Pages Demo</h3>

        <span>Total rows selected: {selection.length} ({JSON.stringify(selection)})</span>

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
          <TableColumnSelection />
          <PagingPanel />
        </DataGrid>
      </div>
    );
  }
}
