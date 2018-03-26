import * as React from 'react';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import { generateRows } from '../../../demo-data/generator';

const SortingIcon = ({ direction }) => (
  <i
    className={`glyphicon glyphicon-arrow-${direction === 'desc' ? 'down' : 'up'}`}
    style={{
      top: '0',
      fontSize: '9px',
    }}
  />
);

const SortingControl = ({ onSort, title, sortingDirection }) => (
  <button
    className="btn btn-default"
    onClick={onSort}
  >
    {title}
    {(sortingDirection && <SortingIcon direction={sortingDirection} />)}
  </button>
);

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
      rows: generateRows({ length: 8 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <div>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
          />
          <IntegratedSorting />
          <Table />
          <TableHeaderRow
            showSortingControls
            sortingComponent={SortingControl}
          />
        </Grid>
      </div>
    );
  }
}
