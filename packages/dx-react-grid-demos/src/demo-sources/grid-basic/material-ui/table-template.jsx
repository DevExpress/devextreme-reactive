import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const styles = theme => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary[50],
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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }

  render() {
    const { rows, columns } = this.state;

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
  }
}
