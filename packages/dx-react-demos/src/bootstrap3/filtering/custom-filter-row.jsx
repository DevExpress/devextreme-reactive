import React from 'react';
import PropTypes from 'prop-types';
import {
  DataGrid,
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

const filterFn = (row, filter) => {
  const toLowerCase = value => String(value).toLowerCase();

  if (filter.column === 'sex') {
    return toLowerCase(row[filter.column]) === toLowerCase(filter.value);
  }
  return toLowerCase(row[filter.column]).indexOf(toLowerCase(filter.value)) > -1;
};

const SexFilterCell = ({ filter, setFilter }) => (
  <th style={{ fontWeight: 'normal' }}>
    <div>
      <select
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
      >
        <option value="" />
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  </th>
);

SexFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  setFilter: PropTypes.func.isRequired,
};

SexFilterCell.defaultProps = {
  filter: null,
};

export class CustomFilterRowDemo extends React.PureComponent {
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
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
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
      </DataGrid>
    );
  }
}
