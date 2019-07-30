import React, { useState } from 'react';
import {
  DataTypeProvider,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const getRowId = row => row.id;

const BooleanFormatter = ({ value }) => (
  <span className="label label-default">
    {value ? 'Yes' : 'No'}
  </span>
);

const BooleanEditor = ({ value, onValueChange }) => (
  <select
    className="form-control"
    value={value}
    onChange={e => onValueChange(e.target.value === 'true')}
  >
    <option value={false}>
      No
    </option>
    <option value>
      Yes
    </option>
  </select>
);

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

export default () => {
  const [columns] = useState([
    { name: 'customer', title: 'Customer' },
    { name: 'product', title: 'Product' },
    { name: 'units', title: 'Units' },
    { name: 'shipped', title: 'Shipped' },
  ]);
  const [rows, setRows] = useState(generateRows({
    columnValues: { id: ({ index }) => index, ...globalSalesValues },
    length: 8,
  }));
  const [booleanColumns] = useState(['shipped']);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <Grid
      rows={rows}
      columns={columns}
      getRowId={getRowId}
    >
      <BooleanTypeProvider
        for={booleanColumns}
      />
      <EditingState
        onCommitChanges={commitChanges}
        defaultEditingRowIds={[0]}
      />
      <Table />
      <TableHeaderRow />
      <TableEditRow />
      <TableEditColumn
        showAddCommand
        showEditCommand
        showDeleteCommand
      />
    </Grid>
  );
};
