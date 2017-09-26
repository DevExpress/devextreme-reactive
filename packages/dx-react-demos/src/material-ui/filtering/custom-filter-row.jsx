import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

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
} from '../../demo-data/generator';

const filterFn = (row, filter) => {
  const toLowerCase = value => String(value).toLowerCase();

  if (filter.columnName === 'sex') {
    return toLowerCase(row[filter.columnName]) === toLowerCase(filter.value);
  }
  return toLowerCase(row[filter.columnName]).indexOf(toLowerCase(filter.value)) > -1;
};

const styles = theme => ({
  cell: {
    width: '100%',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 1.5,
    verticalAlign: 'top',
  },
  placeholder: {
    color: 'rgba(0,0,0,0.36)',
  },
  root: {
    width: '100%',
  },
});

const emptyValue = ' ';

const SexFilterCellBase = ({ setFilter, filter, classes }) => (
  <TableCell className={classes.cell}>
    <Select
      classes={{ select: filter ? null : classes.placeholder }}
      value={filter ? filter.value : emptyValue}
      onChange={event =>
        setFilter(event.target.value !== emptyValue ? { value: event.target.value } : null)
      }
      input={<Input classes={{ root: classes.root }} />}
      renderValue={value => (value === emptyValue ? 'Filter...' : value)}
    >
      <MenuItem value={emptyValue}>Any</MenuItem>
      <MenuItem value={'Male'}>Male</MenuItem>
      <MenuItem value={'Female'}>Female</MenuItem>
    </Select>
  </TableCell>
);

SexFilterCellBase.propTypes = {
  setFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.object,
};

SexFilterCellBase.defaultProps = {
  filter: null,
};

const SexFilterCell = withStyles(styles, { name: 'SexFilterCell' })(SexFilterCellBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
    };
  }

  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ columnName: 'sex', value: 'Male' }]} />
        <LocalFiltering filterFn={filterFn} />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow
          filterCellTemplate={({ column, filter, setFilter }) => {
            if (column.name === 'sex') {
              return <SexFilterCell filter={filter} setFilter={setFilter} />;
            }

            return undefined;
          }}
        />
      </Grid>
    );
  }
}
