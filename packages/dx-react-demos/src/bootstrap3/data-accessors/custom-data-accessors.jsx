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

const splitColumnName = (columnName) => {
  const parts = columnName.split('.');
  return { rootField: parts[0], nestedField: parts[1] };
};

const getCellValue = (row, columnName) => {
  if (columnName.indexOf('.') > -1) {
    const { rootField, nestedField } = splitColumnName(columnName);
    return row[rootField] ? row[rootField][nestedField] : undefined;
  }
  return row[columnName];
};

const createRowChange = (row, columnName, value) => {
  if (columnName.indexOf('.') > -1) {
    const { rootField, nestedField } = splitColumnName(columnName);

    return {
      [rootField]: {
        ...row[rootField],
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
