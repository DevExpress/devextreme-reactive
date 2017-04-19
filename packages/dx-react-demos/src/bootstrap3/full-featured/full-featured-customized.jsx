import React from 'react';
import {
    DataGrid,
    TableViewCellTemplate,
    SortingState, SelectionState, FilteringState, PagingState, GroupingState,
    LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableRowDetail, TableHeaderRow,
    TableFilterRow, TableSelection, PagingPanel, GroupingPanel, TableGroupRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';
import {
    ProgressBar,
    Panel,
    Button,
} from 'react-bootstrap';

import {
  generateRows,
  globalSalesValues,
} from '../../demoData';

const getColor = (amount) => {
  if (amount < 3000) {
    return '#ffc2c2';
  }
  if (amount < 5000) {
    return '#ffdbb1';
  }
  if (amount < 8000) {
    return '#ddffdd';
  }
  return '#b6f8b6';
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
      rows: generateRows({ columnValues: globalSalesValues, length: 100000 }),
    };

    this.rowTemplate = ({ row }) => (
      <Panel header={row.product} bsStyle="danger">
        <p>Panel content </p>
        <Button type="submit" bsStyle="danger" className="pull-right">
          Take Action
        </Button>
      </Panel>
      );
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

          <TableRowDetail
            defaultExpandedDetails={[3]}
            template={this.rowTemplate}
          />

          <TableGroupRow />

          <GroupingPanel />

        </DataGrid>
      </div>
    );
  }
}
