import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
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
  DropDownMenu,
} from '@devexpress/dx-react-grid-material-ui';
import {
  generateRows,
} from '../../demo-data/generator';

const toLowerCase = value => String(value).toLowerCase();
const predicate = (value, filter) => {
  if (filter.columnName === 'sex') {
    return toLowerCase(value) === toLowerCase(filter.value);
  }
  return toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;
};

const styles = theme => ({
  cell: {
    width: '100%',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const SexFilterCellBase = ({ setFilter, classes }) => (
  <TableCell className={classes.cell}>
    <DropDownMenu
      onItemClick={(item, index) => setFilter(index ? { value: item } : null)}
      defaultTitle={'Sex'}
      items={[
        '-',
        'Male',
        'Female',
      ]}
    />
  </TableCell>
);

SexFilterCellBase.propTypes = {
  setFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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
        <FilteringState defaultFilters={[]} />
        <LocalFiltering predicate={predicate} />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow
          filterCellTemplate={({ column, setFilter }) => {
            if (column.name === 'sex') {
              return <SexFilterCell setFilter={setFilter} />;
            }

            return undefined;
          }}
        />
      </Grid>
    );
  }
}
