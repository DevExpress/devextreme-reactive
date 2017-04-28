import React from 'react';
import {
  DataGrid,
  EditingState,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class EditRowDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'edit', type: 'edit', width: 140 },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
    };

    this.commitChanges = ({ created, updated, deleted }) => {
      let rows = this.state.rows.slice();
      if (created) {
        rows = [...created, ...rows];
      }
      if (updated) {
        Object.keys(updated).forEach((key) => {
          const index = Number(key);
          const change = updated[index];
          rows[index] = Object.assign({}, rows[index], change);
        });
      }
      if (deleted) {
        deleted.forEach((index) => {
          rows.splice(index, 1);
        });
      }
      this.setState({ rows });
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <EditingState
          onCommitChanges={this.commitChanges}
        />
        <TableView />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          allowCreating
          allowEditing
          allowDeleting
        />
      </DataGrid>
    );
  }
}
