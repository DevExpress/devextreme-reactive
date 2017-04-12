import React from 'react';
import {
    DataGrid,
    SelectionState,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    VirtualTableView,
    TableSelection,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class SelectAllVirtualDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(1000),
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
          <SelectionState
            selection={selection}
            selectionChange={this.changeSelection}
          />
          <VirtualTableView />
          <TableHeaderRow />
          <TableSelection />
        </DataGrid>
      </div>
    );
  }
}
