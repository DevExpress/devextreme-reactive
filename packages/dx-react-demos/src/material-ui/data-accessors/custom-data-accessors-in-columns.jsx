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

const getRowDataId = rowData => rowData.id;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: 'firstName',
          title: 'First Name',
          getCellValue: rowData => (rowData.user ? rowData.user.firstName : undefined),
          createRowChange: (rowData, value) => ({
            user: {
              ...rowData.user,
              firstName: value,
            },
          }),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          getCellValue: rowData => (rowData.user ? rowData.user.lastName : undefined),
          createRowChange: (rowData, value) => ({
            user: {
              ...rowData.user,
              lastName: value,
            },
          }),
        },
        {
          name: 'car',
          title: 'Car',
          getCellValue: rowData => (rowData.car ? rowData.car.model : undefined),
          createRowChange: (rowData, value) => ({
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
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
        getRowDataId={getRowDataId}
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
