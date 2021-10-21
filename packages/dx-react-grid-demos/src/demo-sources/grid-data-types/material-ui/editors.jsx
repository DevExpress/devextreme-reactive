import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const getRowId = row => row.id;

const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;

const BooleanEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value ? 'Yes' : 'No'}
    onChange={event => onValueChange(event.target.value === 'Yes')}
    style={{ width: '100%' }}
  >
    <MenuItem value="Yes">
      Yes
    </MenuItem>
    <MenuItem value="No">
      No
    </MenuItem>
  </Select>
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
    <Paper>
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
    </Paper>
  );
};
