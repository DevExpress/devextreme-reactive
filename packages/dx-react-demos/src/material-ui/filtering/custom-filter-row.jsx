import React from 'react';
import PropTypes from 'prop-types';
import { Input, TableCell, Paper } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import {
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const styles = theme => ({
  cell: {
    verticalAlign: 'top',
    width: '100%',
    paddingTop: theme.spacing.unit + 4,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  input: {
    width: '100%',
  },
});

const UnitsFilterCellBase = ({ filter, setFilter, classes }) => (
  <TableCell className={classes.cell}>
    <Input
      className={classes.input}
      type="number"
      value={filter ? filter.value : ''}
      onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
      placeholder="Filter..."
      inputProps={{
        style: { textAlign: 'right' },
        min: 1,
        max: 4,
      }}
    />
  </TableCell>
);

UnitsFilterCellBase.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
  setFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

UnitsFilterCellBase.defaultProps = {
  filter: null,
};

const UnitsFilterCell = withStyles(styles, { name: 'SexFilterCell' })(UnitsFilterCellBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'units', title: 'Quantity', align: 'right' },
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
          <FilteringState defaultFilters={[{ columnName: 'units', value: 2 }]} />
          <LocalFiltering />
          <TableView />
          <TableHeaderRow />
          <TableFilterRow
            filterCellTemplate={({ column, filter, setFilter }) => {
              if (column.name === 'units') {
                return <UnitsFilterCell filter={filter} setFilter={setFilter} />;
              }

              return undefined;
            }}
          />
        </Grid>
      </Paper>
    );
  }
}
