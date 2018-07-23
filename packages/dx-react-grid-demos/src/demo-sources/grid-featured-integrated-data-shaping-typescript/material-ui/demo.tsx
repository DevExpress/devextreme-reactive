import {
  Column,
  FilteringState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSelection, IntegratedSorting,
  PagingState, SelectionState, SortingState, Table as TableBase,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser, DragDropProvider,
  Grid, GroupingPanel, PagingPanel,
  Table, TableColumnReordering, TableColumnVisibility, TableFilterRow, TableGroupRow,
  TableHeaderRow, TableSelection, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';

import { CurrencyTypeProvider } from '../../../theme-sources/material-ui/components/ts/currency-type-provider';
import { HighlightedCell } from '../../../theme-sources/material-ui/components/ts/highlighted-cell';
import { PercentTypeProvider } from '../../../theme-sources/material-ui/components/ts/percent-type-provider';
import { ProgressBarCell } from '../../../theme-sources/material-ui/components/ts/progress-bar-cell';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

interface ISale {
  product: string,
  region: string,
  amount: string,
  discount: string,
  saleDate: string,
  customer: string,
}

interface IGridState {
  columns: Column[],
  tableColumnExtensions: TableBase.ColumnExtension[],
  rows: ISale[],
  pageSizes: number[],
  currencyColumns: string[],
  percentColumns: string[],
}

const Cell = (props: TableBase.DataCellProps) => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const sales: ISale[] = generateRows({ columnValues: globalSalesValues, length: 1000 });

export default class Demo extends React.Component<object, IGridState> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      currencyColumns: ['amount'],
      pageSizes: [5, 10, 15],
      percentColumns: ['discount'],
      rows: sales,
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
    };
  }
  public render(): React.ReactNode {
    const {
      rows, columns, tableColumnExtensions, pageSizes,
      currencyColumns, percentColumns,
    } = this.state;

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

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableSelection showSelectAll={true} />

          <TableColumnReordering defaultOrder={columns.map((column: Column) : string => column.name)} />
          <TableHeaderRow showSortingControls={true} />
          <TableFilterRow showFilterSelector={true} />
          <PagingPanel pageSizes={pageSizes} />

          <TableGroupRow />
          <TableColumnVisibility
            defaultHiddenColumnNames={['customer']}
          />
          <Toolbar />
          <GroupingPanel showSortingControls={true} />
          <ColumnChooser />
        </Grid>
      </Paper>
    );
  }
}
