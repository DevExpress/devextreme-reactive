import React from 'react';
import {
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  defaultColumnValues,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID', width: 60 },
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
      addedRows: [],
      changedRows: {},
    };

    this.changeEditingRows = editingRows => this.setState({ editingRows });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeAddedRows = (addedRows) => {
      const initialized = addedRows.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
      this.setState({ addedRows: initialized });
    };
    this.commitChanges = ({ added, changed, deleted }) => {
      let rows = this.state.rows;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.setState({ rows });
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={row => row.id}
      >
        <EditingState
          editingRows={this.state.editingRows}
          onEditingRowsChange={this.changeEditingRows}
          changedRows={this.state.changedRows}
          onChangedRowsChange={this.changeChangedRows}
          addedRows={this.state.addedRows}
          onAddedRowsChange={this.changeAddedRows}
          onCommitChanges={this.commitChanges}
        />
        <TableView />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          allowAdding={!this.state.addedRows.length}
          allowEditing
          allowDeleting
        />
      </Grid>
    );
  }
}
