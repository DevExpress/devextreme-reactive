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
    onSortingsChange,
    selection,
    onSelectionChange,
    expandedDetails,
    onExpandedDetailsChange,
    filters,
    onFiltersChange,
    currentPage,
    onCurrentPageChange,
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
          onFiltersChange={onFiltersChange}
        />
        <SortingState
          sortings={sortings}
          onSortingsChange={onSortingsChange}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={onCurrentPageChange}
          pageSize={10}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={onSelectionChange}
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
          onExpandedDetailsChange={onExpandedDetailsChange}
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
  onSortingsChange: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  expandedDetails: PropTypes.array.isRequired,
  onExpandedDetailsChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onExpandedDetailsChange: expandedDetails => dispatch(createGridAction('expandedDetails', expandedDetails)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onSortingsChange: sortings => dispatch(createGridAction('sortings', sortings)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
