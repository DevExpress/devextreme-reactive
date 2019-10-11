import React, { useState } from 'react';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

const SortingIcon = ({ direction }) => (
  <span
    className={`oi oi-arrow-thick-${direction === 'asc' ? 'top' : 'bottom'}`}
    style={{ fontSize: '12px', paddingLeft: '5px' }}
  />
);

const SortLabel = ({ onSort, children, direction }) => (
  <button
    type="button"
    className="btn btn-light btn-sm"
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
    <div className="card">
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
