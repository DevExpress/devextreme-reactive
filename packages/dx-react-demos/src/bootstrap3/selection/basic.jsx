import React from 'react';
import {
    DataGrid,
    SelectionState,
} from '@devexpress/dx-react-datagrid';
import {
    TableView,
    TableSelection,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class BasicSelectionDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(6),
      selection: [1],
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
        <TableView />
        <TableSelection />
      </DataGrid>
    );
  }
}
