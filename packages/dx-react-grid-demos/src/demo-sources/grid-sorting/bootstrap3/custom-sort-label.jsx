import React, { useState } from 'react';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import { generateRows } from '../../../demo-data/generator';

const SortingIcon = ({ direction }) => (
  <i
    className={`glyphicon glyphicon-arrow-${direction === 'desc' ? 'down' : 'up'}`}
    style={{
      top: '0',
      fontSize: '9px',
    }}
  />
);

const SortLabel = ({ onSort, children, direction }) => (
  <button
    className="btn btn-default"
    type="button"
    onClick={onSort}
  >
    {children}
    {(direction && <SortingIcon direction={direction} />)}
  </button>
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
    <div>
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
    </div>
  );
};
