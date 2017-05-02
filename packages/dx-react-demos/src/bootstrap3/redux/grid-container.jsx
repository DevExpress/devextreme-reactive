import React from 'react';
import PropTypes from 'prop-types';
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
  row: PropTypes.object.isRequired,
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
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortings: PropTypes.array.isRequired,
  sortingsChange: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  selectionChange: PropTypes.func.isRequired,
  expandedDetails: PropTypes.array.isRequired,
  expandedDetailsChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  filtersChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  currentPageChange: PropTypes.func.isRequired,
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
