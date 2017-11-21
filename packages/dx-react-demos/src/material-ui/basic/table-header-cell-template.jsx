import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableHeaderCell,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const styles = {
  highlightedBackground: {
    backgroundColor: 'lightblue',
  },
};

// eslint-disable-next-line react/prop-types
const HeaderCellBase = ({ classes, ...restProps }) =>
  (<TableHeaderCell {...restProps} className={classes.highlightedBackground} />);

const CustomHeaderCell =
  withStyles(styles, { name: 'CustomHeaderCell' })(HeaderCellBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'channel', title: 'Channel' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 14 }),
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
            headerCellTemplate={args => (
              <CustomHeaderCell
                {...args}
              />)
            }
          />
        </Grid>
      </Paper>
    );
  }
}
