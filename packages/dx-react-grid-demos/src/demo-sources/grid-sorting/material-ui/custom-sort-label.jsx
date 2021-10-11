import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import Button from '@mui/material/Button';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

import { generateRows } from '../../../demo-data/generator';

const SortingIcon = ({ direction }) => (
  direction === 'asc'
    ? <ArrowUpward style={{ fontSize: '18px' }} />
    : <ArrowDownward style={{ fontSize: '18px' }} />
);

const SortLabel = ({ onSort, children, direction }) => (
  <Button
    size="small"
    variant="contained"
    onClick={onSort}
  >
    {children}
    {(direction && <SortingIcon direction={direction} />)}
  </Button>
);

export default () => {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [rows] = useState(generateRows({ length: 8 }));

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={SortLabel}
        />
      </Grid>
    </Paper>
  );
};
