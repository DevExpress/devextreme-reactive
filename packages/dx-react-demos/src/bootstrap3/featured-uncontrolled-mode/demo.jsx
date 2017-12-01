import React from 'react';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting, LocalSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropContext, TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
  ProgressBarCell,
} from '../templates/progress-bar-cell';
import {
  HighlightedCell,
} from '../templates/highlighted-cell';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount', align: 'right' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 1000 }),
      allowedPageSizes: [5, 10, 15],
    };

    this.getCellComponent = (columnName) => {
      if (columnName === 'discount') {
        return ProgressBarCell;
      }
      if (columnName === 'amount') {
        return HighlightedCell;
      }
      return undefined;
    };
  }
  render() {
    const { rows, columns, allowedPageSizes } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState
          defaultFilters={[{ columnName: 'saleDate', value: '2016-02' }]}
        />
        <SortingState
          defaultSorting={[
            { columnName: 'product', direction: 'asc' },
            { columnName: 'saleDate', direction: 'asc' },
          ]}
        />
        <GroupingState
          defaultGrouping={[{ columnName: 'product' }]}
          defaultExpandedGroups={['EnviroCare Max']}
        />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={10}
        />
        <SelectionState
          defaultSelection={[1, 3, 18]}
        />

        <LocalGrouping />
        <LocalFiltering />
        <LocalSorting />
        <LocalPaging />
        <LocalSelection />

        <DragDropContext />

        <Table
          getCellComponent={this.getCellComponent}
        />

        <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

        <TableHeaderRow allowSorting allowDragging />
        <TableFilterRow />
        <PagingPanel
          allowedPageSizes={allowedPageSizes}
        />
        <TableSelection showSelectAll />
        <GroupingPanel allowSorting allowDragging />
        <TableGroupRow />

      </Grid>
    );
  }
}
