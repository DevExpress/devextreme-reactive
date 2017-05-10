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
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
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
          onSelectionChange={this.changeSelection}
        />
        <TableView />
        <TableSelection
          selectByRowClick
          highlightSelected
          showSelectionColumn={false}
        />
      </DataGrid>
    );
  }
}
