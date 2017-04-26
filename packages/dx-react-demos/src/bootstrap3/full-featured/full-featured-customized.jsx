import React from 'react';
import {
    DataGrid,
    TableViewCellTemplate,
    SortingState, SelectionState, FilteringState, PagingState, GroupingState,
    LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableHeaderRow,
    TableFilterRow, TableSelection, PagingPanel, GroupingPanel, TableGroupRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';
import {
    ProgressBar,
} from 'react-bootstrap';

import {
  generateRows,
  globalSalesValues,
} from '../../demoData';

const getColor = (amount) => {
  if (amount < 3000) {
    return '#fc7a76';
  }
  if (amount < 5000) {
    return '#ffb294';
  }
  if (amount < 8000) {
    return '#ffd59f';
  }
  return '#c3e2b7';
};

export class FullFeaturedCustomizedDemo extends React.PureComponent {
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
      rows: generateRows({ columnValues: globalSalesValues, length: 10000 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <div>
        <h3>Full Featured Controlled Demo</h3>
        <DataGrid
          rows={rows}
          columns={columns}
        >

          <FilteringState
            defaultFilters={[{ column: 'saleDate', value: 'Feb' }]}
          />
          <SortingState
            defaultSortings={[
              { column: 'product', direction: 'asc' },
              { column: 'saleDate', direction: 'asc' },
            ]}
          />
          <GroupingState
            defaultGrouping={[{ column: 'product' }]}
            defaultExpandedGroups={{ 'EnviroCare Max': true }}
          />
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />

          <LocalFiltering />
          <LocalSorting />
          <LocalGrouping />
          <LocalPaging />

          <SelectionState
            defaultSelection={[1, 3, 18]}
          />

          <TableView>
            <TableViewCellTemplate predicate={({ column }) => column.name === 'discount'}>
              {({ row }) => (
                <td>
                  <ProgressBar
                    style={{
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      margin: 0,
                    }}
                    now={row.discount * 100}
                    label={`${row.discount * 100}%`}
                    srOnly
                  />
                </td>
              )}
            </TableViewCellTemplate>
            <TableViewCellTemplate predicate={({ column }) => column.name === 'amount'}>
              {({ row, column }) => (
                <td
                  style={{
                    backgroundColor: getColor(row.amount),
                    textAlign: column.align || 'left',
                  }}
                >
                  ${row.amount}
                </td>
              )}
            </TableViewCellTemplate>
          </TableView>

          <TableHeaderRow />

          <TableFilterRow />

          <PagingPanel />

          <TableSelection />

          <TableGroupRow />

          <GroupingPanel />

        </DataGrid>
      </div>
    );
  }
}
