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
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateData,
  defaultColumnValues,
} from '../../demo-data/generator';

const getRowDataId = rowData => rowData.id;

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
      data: generateData({
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
    const initialized = addedRows.map(rowData => (Object.keys(rowData).length ? rowData : { city: 'Tokio' }));
    this.setState({ addedRows: initialized });
  }
  changeEditingRows(editingRows) {
    this.setState({ editingRows });
  }
  changeChangedRows(changedRows) {
    this.setState({ changedRows });
  }
  commitChanges({ added, changed, deleted }) {
    let data = this.state.data;
    if (added) {
      const startingAddedId = (data.length - 1) > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        ...added.map((rowData, index) => ({
          id: startingAddedId + index,
          ...rowData,
        })),
      ];
    }
    if (changed) {
      data = data.map(rowData =>
        (changed[rowData.id] ? { ...rowData, ...changed[rowData.id] } : rowData));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      data = data.filter(rowData => !deletedSet.has(rowData.id));
    }
    this.setState({ data });
  }
  render() {
    const { data, columns, editingRows, changedRows, addedRows } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
        getRowDataId={getRowDataId}
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
        <TableView />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          allowAdding={!addedRows.length}
          allowEditing
          allowDeleting
        />
      </Grid>
    );
  }
}
