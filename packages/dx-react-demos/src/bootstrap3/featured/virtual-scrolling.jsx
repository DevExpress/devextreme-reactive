import React from 'react';
import {
    Grid,
    SortingState, SelectionState, FilteringState, GroupingState,
    LocalFiltering, LocalGrouping, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
    VirtualTableView, TableHeaderRow,
    TableFilterRow, TableSelection, GroupingPanel, TableGroupRow,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
    ProgressBarCell,
} from './templates/progress-bar-cell';
import {
    HighlightedCell,
} from './templates/highlighted-cell';

import {
  generateRows,
  globalSalesValues,
} from '../../demoData';

export class VirtualScrollingDemo extends React.PureComponent {
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
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={row => row.id}
      >

        <FilteringState
          defaultFilters={[{ columnName: 'saleDate', value: 'Feb' }]}
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

        <LocalFiltering />
        <LocalSorting />
        <LocalGrouping />

        <SelectionState />

        <VirtualTableView
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

        <TableHeaderRow allowSorting allowGrouping />
        <TableFilterRow rowHeight={51} />
        <TableSelection />
        <TableGroupRow />
        <GroupingPanel allowSorting />

      </Grid>
    );
  }
}
