import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
  button: {
    margin: `0 ${theme.spacing(1)}px`,
  },
});

const TableHeaderContentBase = ({
  column, children, classes, ...restProps
}) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}
  >
    {children}
    {column.name === 'region' ? (
      <IconButton
        className={classes.button}
        // eslint-disable-next-line no-alert
        onClick={() => alert('Custom action')}
      >
        <VisibilityOff />
      </IconButton>
    ) : null}
  </TableHeaderRow.Content>
);

export const TableHeaderContent = withStyles(styles, { name: 'TableHeaderContent' })(TableHeaderContentBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
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
          <Table />
          <TableHeaderRow
            contentComponent={TableHeaderContent}
          />
        </Grid>
      </Paper>
    );
  }
}
