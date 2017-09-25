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
  generateData,
  defaultColumnValues,
} from '../../demo-data/generator';

const getRowDataId = rowData => rowData.id;

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
      data: generateData({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 100000,
      }),
    };

    this.rowTemplate = ({ rowData }) => (
      <div>
        <div>Detail for {rowData.name} ({rowData.sex})</div>
        <div>City: {rowData.city}</div>
        <div>Car: {rowData.car}</div>
      </div>
    );
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
        getRowDataId={getRowDataId}
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
