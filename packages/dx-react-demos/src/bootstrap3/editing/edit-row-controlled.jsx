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
  defaultColumnValues,
} from '../../demoData';

export class EditRowControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'edit', type: 'edit', width: 140 },
        { name: 'id', title: 'ID', width: 50 },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 14,
      }),
      editingRows: [],
      newRows: [],
      changedRows: {},
    };

    this.changeEditingRows = editingRows => this.setState({ editingRows });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeNewRows = (newRows) => {
      const initialized = newRows.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
      this.setState({ newRows: initialized });
    };
    this.commitChanges = ({ created, updated, deleted }) => {
      let rows = this.state.rows.slice();
      if (created) {
        rows = [
          ...created.map((row, index) => ({
            id: rows.length + index,
            ...row,
          })),
          ...rows,
        ];
      }
      if (updated) {
        Object.keys(updated).forEach((key) => {
          const index = rows.findIndex(row => String(row.id) === key);
          const change = updated[index];
          if (index > -1) {
            rows[index] = Object.assign({}, rows[index], change);
          }
        });
      }
      if (deleted) {
        deleted.forEach((rowId) => {
          const index = rows.findIndex(row => row.id === rowId);
          if (index > -1) {
            rows.splice(index, 1);
          }
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
        getRowId={row => row.id}
      >
        <EditingState
          editingRows={this.state.editingRows}
          editingRowsChange={this.changeEditingRows}
          changedRows={this.state.changedRows}
          changedRowsChange={this.changeChangedRows}
          newRows={this.state.newRows}
          newRowsChange={this.changeNewRows}
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
