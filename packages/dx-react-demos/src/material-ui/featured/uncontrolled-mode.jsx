import React from 'react';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel,
} from '@devexpress/dx-react-grid-material-ui';
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

export class UncontrolledModeDemo extends React.PureComponent {
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

        <LocalFiltering />
        <LocalSorting />
        <LocalGrouping />
        <LocalPaging />

        <SelectionState
          defaultSelection={[1, 3, 18]}
        />

        <TableView
          tableCellTemplate={({ row, column }) => {
            if (column.name === 'discount') {
              return (
                <ProgressBarCell value={row.discount * 100} />
              );
            } else if (column.name === 'amount') {
              return (
                <HighlightedCell align={column.align} value={row.amount} />
              );
            }
            return undefined;
          }}
        />

        <TableHeaderRow allowSorting allowGrouping />
        <TableFilterRow />
        <PagingPanel
          allowedPageSizes={allowedPageSizes}
        />
        <TableSelection />
        <TableGroupRow />
        <GroupingPanel allowSorting />

      </Grid>
    );
  }
}
