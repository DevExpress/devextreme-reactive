import React from 'react';
import {
  FilteringState,
  SortingState,
  RowDetailState,
  LocalFiltering,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTableView,
  TableHeaderRow,
  TableFilterRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  defaultColumnValues,
} from '../../demo-data/generator';

const getRowId = row => row.id;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 100000,
      }),
    };

    this.rowTemplate = ({ row }) => (
      <div>
        <div>Detail for {row.name} ({row.sex})</div>
        <div>City: {row.city}</div>
        <div>Car: {row.car}</div>
      </div>
    );
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <FilteringState defaultFilters={[]} />
        <SortingState defaultSorting={[{ columnName: 'city', direction: 'asc' }]} />
        <RowDetailState />

        <LocalFiltering />
        <LocalSorting />

        <VirtualTableView />

        <TableHeaderRow allowSorting />

        <TableFilterRow rowHeight={51} />

        <TableRowDetail
          template={this.rowTemplate}
          rowHeight={80}
        />
      </Grid>
    );
  }
}
