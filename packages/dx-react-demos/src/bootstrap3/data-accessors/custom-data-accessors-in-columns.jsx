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
  generateRows,
  defaultNestedColumnValues,
} from '../../demo-data/generator';

const getRowId = row => row.id;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: 'firstName',
          title: 'First Name',
          getCellValue: row => (row.user ? row.user.firstName : undefined),
          createRowChange: (row, value) => ({
            user: {
              ...row.user,
              firstName: value,
            },
          }),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          getCellValue: row => (row.user ? row.user.lastName : undefined),
          createRowChange: (row, value) => ({
            user: {
              ...row.user,
              lastName: value,
            },
          }),
        },
        {
          name: 'car',
          title: 'Car',
          getCellValue: row => (row.car ? row.car.model : undefined),
          createRowChange: (row, value) => ({
            car: {
              model: value,
            },
          }),
        },
        { name: 'position', title: 'Position' },
        { name: 'city', title: 'City' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
        length: 14,
      }),
    };

    this.commitChanges = this.commitChanges.bind(this);
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
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={this.commitChanges}
        />
        <TableView />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn allowAdding allowEditing allowDeleting />
      </Grid>
    );
  }
}
