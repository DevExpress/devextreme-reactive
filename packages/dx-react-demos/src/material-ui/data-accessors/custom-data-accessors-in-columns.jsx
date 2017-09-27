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
  generateData,
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
      data: generateData({
        columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
        length: 14,
      }),
    };

    this.commitChanges = this.commitChanges.bind(this);
  }
  commitChanges({ added, changed, deleted }) {
    let data = this.state.data;
    if (added) {
      const startingAddedId = (data.length - 1) > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      data = data.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      data = data.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ data });
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
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
