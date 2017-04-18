import React from 'react';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState, PagingState,
    LocalFiltering, LocalPaging, LocalSorting,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableRowDetail, TableHeaderRowSorting,
    TableFilterRow, TableSelection, PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class FullFeaturedControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 105 }),
      sortings: [{ column: 'id', direction: 'asc' }],
      selection: [1, 3, 18],
      expandedDetails: [3],
      filters: [],
      page: 0,
    };

    this.changeExpandedDetails = expandedDetails => this.setState({ expandedDetails });
    this.changeSelection = selection => this.setState({ selection });
    this.changeSortings = sortings => this.setState({ sortings });
    this.changeFilters = filters => this.setState({ filters });
    this.changePage = page => this.setState({ page });
    this.rowTemplate = ({ row }) => <div>Detail for {row.name} from {row.city}</div>;
  }
  render() {
    const { rows, columns, sortings, selection, expandedDetails, filters, page } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <h3>Full Featured Controlled Demo</h3>

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
          <PagingState
            currectPage={page}
            currentPageChange={this.changePage}
            pageSize={10}
          />
          <SelectionState
            selection={selection}
            selectionChange={this.changeSelection}
          />

          <LocalFiltering />
          <LocalSorting />
          <LocalPaging />

          <TableView />

          <TableHeaderRow />
          <TableHeaderRowSorting />

          <TableFilterRow />

          <TableSelection selectByRowClick highlightSelected />

          <TableRowDetail
            expandedDetails={expandedDetails}
            expandedDetailsChange={this.changeExpandedDetails}
            template={this.rowTemplate}
          />

          <PagingPanel />

        </DataGrid>
      </div>
    );
  }
}
