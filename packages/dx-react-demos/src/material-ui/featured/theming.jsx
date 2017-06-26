/* eslint react/prop-types: 0 */
import React from 'react';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
  ColumnOrderState, RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropContext, TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

import { MuiThemeProvider } from 'material-ui/styles';

import {
  generateRows,
  globalSalesValues,
} from '../../demoData';

const createGrid = () => ({ rows, columns, allowedPageSizes, rowTemplate }) => (<Grid
  rows={rows}
  columns={columns}
>
  <ColumnOrderState defaultOrder={columns.map(column => column.name)} />

  <FilteringState />
  <SortingState
    defaultSorting={[
      { columnName: 'product', direction: 'asc' },
    ]}
  />
  <GroupingState />
  <PagingState
    defaultCurrentPage={0}
    defaultPageSize={10}
  />
  <RowDetailState
    defaultExpandedRows={[2, 5]}
  />

  <LocalFiltering />
  <LocalSorting />
  <LocalGrouping />
  <LocalPaging />

  <SelectionState
    defaultSelection={[1, 3, 18]}
  />

  <DragDropContext />

  <TableView allowColumnReordering />

  <TableHeaderRow allowSorting allowGrouping allowDragging />
  <TableFilterRow />
  <PagingPanel
    allowedPageSizes={allowedPageSizes}
  />
  <TableSelection />
  <TableRowDetail
    template={rowTemplate}
  />
  <TableGroupRow />
  <GroupingPanel allowSorting />
</Grid>);

export class ThemingDemo extends React.PureComponent {
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
    this.rowTemplate = ({ row }) => <div>Details for {row.product} from {row.region}</div>;
  }
  render() {
    const { rows, columns, allowedPageSizes } = this.state;
    const GridInst = createGrid();

    return (
      <MuiThemeProvider theme={this.props.theme}>
        <GridInst
          rows={rows}
          columns={columns}
          allowedPageSizes={allowedPageSizes}
          rowTemplate={this.rowTemplate}
        />
      </MuiThemeProvider>
    );
  }
}
