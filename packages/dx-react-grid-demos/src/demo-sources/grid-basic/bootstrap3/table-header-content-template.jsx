import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const TableHeaderContent = ({ column, children, ...restProps }) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}
  >
    {children}
    {column.name === 'region' ? (
      <button
        type="button"
        className="btn btn-default"
        // eslint-disable-next-line no-alert
        onClick={() => alert('Custom action')}
        style={{
          margin: '-7px 5px',
        }}
      >
        <i className="glyphicon glyphicon-eye-close" />
      </button>
    ) : null}
  </TableHeaderRow.Content>
);

export default () => {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));

  return (
    <div>
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table />
        <TableHeaderRow
          contentComponent={TableHeaderContent}
        />
      </Grid>
    </div>
  );
};
