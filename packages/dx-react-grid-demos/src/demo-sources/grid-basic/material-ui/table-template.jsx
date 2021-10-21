import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { alpha } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const styles = theme => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  },
});

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table
    {...restProps}
    className={classes.tableStriped}
  />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);

export default () => {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    { name: 'customer', title: 'Customer' },
    { name: 'product', title: 'Product' },
    { name: 'amount', title: 'Sale Amount' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table
          tableComponent={TableComponent}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  );
};
