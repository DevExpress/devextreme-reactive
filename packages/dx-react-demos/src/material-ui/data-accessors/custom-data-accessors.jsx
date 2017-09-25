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

const splitColumnName = (columnName) => {
  const parts = columnName.split('.');
  return { rootField: parts[0], nestedField: parts[1] };
};

const getCellValue = (rowData, columnName) => {
  if (columnName.indexOf('.') > -1) {
    const { rootField, nestedField } = splitColumnName(columnName);
    return rowData[rootField] ? rowData[rootField][nestedField] : undefined;
  }
  return rowData[columnName];
};

const createRowChange = (rowData, columnName, value) => {
  if (columnName.indexOf('.') > -1) {
    const { rootField, nestedField } = splitColumnName(columnName);

    return {
      [rootField]: {
        ...rowData[rootField],
        [nestedField]: value,
      },
    };
  }
  return { [columnName]: value };
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'user.firstName', title: 'First Name' },
        { name: 'user.lastName', title: 'Last Name' },
        { name: 'car.model', title: 'Car' },
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
        getCellValue={getCellValue}
      >
        <EditingState
          createRowChange={createRowChange}
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
