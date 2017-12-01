import React from 'react';
import {
  SortingState, SelectionState, FilteringState, GroupingState,
  LocalFiltering, LocalGrouping, LocalSorting, LocalSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  TableColumnReordering, GroupingPanel, DragDropContext,
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

const getRowId = row => row.id;

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
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 200000,
      }),
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
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <DragDropContext />

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
        <SelectionState />

        <LocalFiltering />
        <LocalSorting />
        <LocalGrouping />
        <LocalSelection />

        <VirtualTable
          getCellComponent={this.getCellComponent}
        />

        <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

        <TableHeaderRow allowSorting allowDragging />
        <TableFilterRow rowHeight={51} />
        <TableSelection showSelectAll />
        <TableGroupRow />
        <GroupingPanel allowSorting allowDragging />
      </Grid>
    );
  }
}
