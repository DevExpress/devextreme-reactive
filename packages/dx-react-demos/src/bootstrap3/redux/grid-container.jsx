import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Grid,
    SortingState, SelectionState, FilteringState, PagingState, RowDetailState,
    LocalFiltering, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
    TableView, TableRowDetail,
    TableFilterRow, TableSelection, PagingPanel,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import { createGridAction } from './grid-reducer';

const DetailRow = ({ row }) => <div>Details for {row.name} from {row.city}</div>;
DetailRow.propTypes = {
  row: PropTypes.object.isRequired,
};

const GridContainer = (props) => {
  const {
    rows,
    columns,

    sorting,
    onSortingChange,
    selection,
    onSelectionChange,
    expandedRows,
    onExpandedRowsChange,
    filters,
    onFiltersChange,
    currentPage,
    onCurrentPageChange,
  } = props;

  return (
    <div style={{ width: '100%' }}>
      <h3>Managing Grid State in a Redux Store</h3>

      <Grid
        rows={rows}
        columns={columns}
      >

        <FilteringState
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
        <SortingState
          sorting={sorting}
          onSortingChange={onSortingChange}
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
        <RowDetailState
          expandedRows={expandedRows}
          onExpandedRowsChange={onExpandedRowsChange}
        />

        <LocalFiltering />
        <LocalSorting />
        <LocalPaging />

        <TableView />

        <TableHeaderRow allowSorting />

        <TableFilterRow />

        <TableSelection />

        <TableRowDetail
          template={DetailRow}
        />

        <PagingPanel />

      </Grid>
    </div>
  );
};
GridContainer.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sorting: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  expandedRows: PropTypes.array.isRequired,
  onExpandedRowsChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onExpandedRowsChange: expandedRows => dispatch(createGridAction('expandedRows', expandedRows)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
