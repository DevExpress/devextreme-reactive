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
  defaultNestedColumnValues,
} from '../../demo-data/generator';

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

    this.getRowId = row => row.id;
    this.getCellValue = (row, columnName) => {
      if (columnName.indexOf('.') > -1) {
        const { rootField, nestedField } = this.splitColumnName(columnName);
        return row[rootField] ? row[rootField][nestedField] : undefined;
      }
      return row[columnName];
    };
    this.createRowChange = (row, columnName, value) => {
      if (columnName.indexOf('.') > -1) {
        const { rootField, nestedField } = this.splitColumnName(columnName);

        return {
          [rootField]: {
            ...row[rootField],
            [nestedField]: value,
          },
        };
      }
      return { [columnName]: value };
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
    this.splitColumnName = (columnName) => {
      const parts = columnName.split('.');
      return { rootField: parts[0], nestedField: parts[1] };
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={this.getRowId}
        getCellValue={this.getCellValue}
      >
        <EditingState
          createRowChange={this.createRowChange}
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
