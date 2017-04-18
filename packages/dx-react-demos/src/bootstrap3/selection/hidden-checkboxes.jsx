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
  generateRows,
} from '../../demoData';

export class SelectionWithHiddenCheckboxesDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'sex', title: 'Sex' },
        { name: 'name', title: 'Name' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 6 }),
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
        <TableSelection
          selectByRowClick
          highlightSelected
          showCheckboxes={false}
        />
      </DataGrid>
    );
  }
}
