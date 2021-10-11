import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const styles = theme => ({
  cell: {
    width: '100%',
    padding: theme.spacing(1),
  },
  input: {
    fontSize: '14px',
    width: '100%',
  },
});

const UnitsFilterCellBase = ({ filter, onFilter, classes }) => (
  <TableCell className={classes.cell}>
    <Input
      className={classes.input}
      type="number"
      value={filter ? filter.value : ''}
      onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      placeholder="Filter..."
      inputProps={{
        style: { textAlign: 'right', height: 'inherit' },
        min: 1,
        max: 4,
      }}
    />
  </TableCell>
);
const UnitsFilterCell = withStyles(styles, { name: 'UnitsFilterCell' })(UnitsFilterCellBase);

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === 'units') {
    return <UnitsFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

export default () => {
  const [columns] = useState([
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    { name: 'units', title: 'Quantity' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
  const [tableColumnExtensions] = useState([
    { columnName: 'units', align: 'right' },
  ]);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ columnName: 'units', value: 2 }]} />
        <IntegratedFiltering />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableFilterRow
          cellComponent={FilterCell}
        />
      </Grid>
    </Paper>
  );
};
