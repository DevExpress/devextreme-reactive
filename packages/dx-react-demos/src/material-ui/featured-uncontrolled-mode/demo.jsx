import React from 'react';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting, LocalSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropContext, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
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
  }
  render() {
    const { rows, columns, allowedPageSizes } = this.state;

    return (
      <Paper>
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

          <SelectionState />

          <GroupingState
            defaultGrouping={[{ columnName: 'product' }]}
            defaultExpandedGroups={['EnviroCare Max']}
          />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={10}
          />


          <LocalGrouping />
          <LocalFiltering />
          <LocalSorting />
          <LocalPaging />
          <LocalSelection />



          <DragDropContext />

          <Table
            tableCellTemplate={({ row, column, style }) => {
              if (column.name === 'discount') {
                return (
                  <ProgressBarCell value={row.discount * 100} style={style} />
                );
              } else if (column.name === 'amount') {
                return (
                  <HighlightedCell align={column.align} value={row.amount} style={style} />
                );
              }
              return undefined;
            }}
          />
          <TableSelection />

          <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

          <TableHeaderRow allowSorting allowDragging />
          <TableFilterRow />
          <PagingPanel
            allowedPageSizes={allowedPageSizes}
          />

          <TableGroupRow />
          <GroupingPanel allowSorting allowDragging />
        </Grid>
      </Paper>
    );
  }
}
