import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

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

const filterFn = (row, filter) => {
  const toLowerCase = value => String(value).toLowerCase();

  if (filter.columnName === 'sex') {
    return toLowerCase(row[filter.columnName]) === toLowerCase(filter.value);
  }
  return toLowerCase(row[filter.columnName]).indexOf(toLowerCase(filter.value)) > -1;
};

const styleSheet = createStyleSheet('SexFilterCell', theme => ({
  cell: {
    width: '100%',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
}));

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

const SexFilterCell = withStyles(styleSheet)(SexFilterCellBase);

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
        <LocalFiltering filterFn={filterFn} />
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
