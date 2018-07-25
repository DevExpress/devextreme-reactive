import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const UnitsFilterCell = ({ filter, onFilter }) => (
  <th style={{ fontWeight: 'normal' }}>
    <input
      type="number"
      className="form-control text-right"
      value={filter ? filter.value : ''}
      min={1}
      max={4}
      onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
    />
  </th>
);
UnitsFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
  onFilter: PropTypes.func.isRequired,
};
UnitsFilterCell.defaultProps = {
  filter: null,
};

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === 'units') {
    return <UnitsFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};
FilterCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'units', title: 'Quantity' },
      ],
      tableColumnExtensions: [
        { columnName: 'units', align: 'right' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }

  render() {
    const { rows, columns, tableColumnExtensions } = this.state;

    return (
      <div className="card">
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
      </div>
    );
  }
}
