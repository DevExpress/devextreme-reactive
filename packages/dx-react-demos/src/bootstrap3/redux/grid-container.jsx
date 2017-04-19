import React from 'react';
import { connect } from 'react-redux';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState, PagingState,
    LocalFiltering, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableRowDetail,
    TableFilterRow, TableSelection, PagingPanel,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import { createGridAction } from './grid-reducer';

const DetailRow = ({ row }) => <div>Details for {row.name} from {row.city}</div>;
DetailRow.propTypes = {
  row: React.PropTypes.object.isRequired,
};

const GridContainer = (props) => {
  const {
    rows,
    columns,

    sortings,
    sortingsChange,
    selection,
    selectionChange,
    expandedDetails,
    expandedDetailsChange,
    filters,
    filtersChange,
    currentPage,
    currentPageChange,
  } = props;

  return (
    <div style={{ width: '100%' }}>
      <h3>Managing Grid State in a Redux Store</h3>

      <DataGrid
        rows={rows}
        columns={columns}
      >

        <FilteringState
          filters={filters}
          filtersChange={filtersChange}
        />
        <SortingState
          sortings={sortings}
          sortingsChange={sortingsChange}
        />
        <PagingState
          currentPage={currentPage}
          currentPageChange={currentPageChange}
          pageSize={10}
        />
        <SelectionState
          selection={selection}
          selectionChange={selectionChange}
        />

        <LocalFiltering />
        <LocalSorting />
        <LocalPaging />

        <TableView />

        <TableHeaderRow sortingEnabled />

        <TableFilterRow />

        <TableSelection />

        <TableRowDetail
          expandedDetails={expandedDetails}
          expandedDetailsChange={expandedDetailsChange}
          template={DetailRow}
        />

        <PagingPanel />

      </DataGrid>
    </div>
  );
};
GridContainer.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  sortings: React.PropTypes.array.isRequired,
  sortingsChange: React.PropTypes.func.isRequired,
  selection: React.PropTypes.array.isRequired,
  selectionChange: React.PropTypes.func.isRequired,
  expandedDetails: React.PropTypes.array.isRequired,
  expandedDetailsChange: React.PropTypes.func.isRequired,
  filters: React.PropTypes.array.isRequired,
  filtersChange: React.PropTypes.func.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  currentPageChange: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  expandedDetailsChange: expandedDetails => dispatch(createGridAction('expandedDetails', expandedDetails)),
  selectionChange: selection => dispatch(createGridAction('selection', selection)),
  sortingsChange: sortings => dispatch(createGridAction('sortings', sortings)),
  filtersChange: filters => dispatch(createGridAction('filters', filters)),
  currentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
