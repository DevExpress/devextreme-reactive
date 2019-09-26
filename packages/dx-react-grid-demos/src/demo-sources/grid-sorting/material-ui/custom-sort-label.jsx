import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

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
