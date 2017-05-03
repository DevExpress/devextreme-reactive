import React from 'react';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState, PagingState, GroupingState,
    LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableHeaderRow,
    TableFilterRow, TableSelection, PagingPanel, GroupingPanel, TableGroupRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';
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

export class ControlledModeDemo extends React.PureComponent {
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
      sortings: [
        { column: 'product', direction: 'asc' },
        { column: 'saleDate', direction: 'asc' },
      ],
      grouping: [{ column: 'product' }],
      expandedGroups: ['EnviroCare Max'],
      selection: [],
      filters: [{ column: 'saleDate', value: 'Feb' }],
      currentPage: 0,
    };

    this.changeSortings = sortings => this.setState({ sortings });
    this.changeGrouping = grouping => this.setState({ grouping });
    this.changeExpandedGroups = expandedGroups => this.setState({ expandedGroups });
    this.changeSelection = selection => this.setState({ selection });
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
  }
  render() {
    const {
      rows,
      columns,
      sortings,
      grouping,
      expandedGroups,
      selection,
      filters,
      currentPage,
    } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >

        <FilteringState
          filters={filters}
          filtersChange={this.changeFilters}
        />
        <SortingState
          sortings={sortings}
          sortingsChange={this.changeSortings}
        />
        <GroupingState
          grouping={grouping}
          groupingChange={this.changeGrouping}
          expandedGroups={expandedGroups}
          expandedGroupsChange={this.changeExpandedGroups}
        />
        <PagingState
          currentPage={currentPage}
          currentPageChange={this.changeCurrentPage}
          pageSize={10}
        />

        <LocalFiltering />
        <LocalSorting />
        <LocalGrouping />
        <LocalPaging />

        <SelectionState
          selection={selection}
          selectionChange={this.changeSelection}
        />

        <TableView
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

        <TableHeaderRow sortingEnabled groupingEnabled />
        <TableFilterRow />
        <PagingPanel />
        <TableSelection />
        <TableGroupRow />
        <GroupingPanel sortingEnabled />

      </DataGrid>
    );
  }
}
