import React from 'react';
import {
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
  defaultColumnValues,
} from '../../demo-data/generator';

const getRowId = row => row.id;

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

    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRows = this.changeEditingRows.bind(this);
    this.changeChangedRows = this.changeChangedRows.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
  }
  changeAddedRows(addedRows) {
    const initialized = addedRows.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
    this.setState({ addedRows: initialized });
  }
  changeEditingRows(editingRows) {
    this.setState({ editingRows });
  }
  changeChangedRows(changedRows) {
    this.setState({ changedRows });
  }
  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;
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
  }
  render() {
    const {
      rows, columns, editingRows, changedRows, addedRows,
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            allowAdding={!addedRows.length}
            allowEditing
            allowDeleting
          />
        </Grid>
      </Paper>
    );
  }
}
