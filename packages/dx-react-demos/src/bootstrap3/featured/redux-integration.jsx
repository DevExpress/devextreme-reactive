/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
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

export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const GridContainer = (props) => {
  const {
    rows,
    columns,

    sorting,
    onSortingChange,
    selection,
    onSelectionChange,
    grouping,
    onGroupingChange,
    expandedGroups,
    onExpandedGroupsChange,
    filters,
    onFiltersChange,
    currentPage,
    onCurrentPageChange,
  } = props;

  return (
    <DataGrid
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
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChange}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChange}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChange}
        pageSize={10}
      />

      <LocalFiltering />
      <LocalSorting />
      <LocalGrouping />
      <LocalPaging />

      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
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

      <TableHeaderRow allowSorting allowGrouping />
      <TableFilterRow />
      <PagingPanel />
      <TableSelection />
      <TableGroupRow />
      <GroupingPanel allowSorting />

    </DataGrid>
  );
};
GridContainer.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sorting: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  grouping: PropTypes.array.isRequired,
  onGroupingChange: PropTypes.func.isRequired,
  expandedGroups: PropTypes.array.isRequired,
  onExpandedGroupsChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};

const gridInitialState = {
  columns: [
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'amount', title: 'Sale Amount', align: 'right' },
    { name: 'discount', title: 'Discount' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'customer', title: 'Customer' },
  ],
  rows: generateRows({ columnValues: globalSalesValues, length: 1000 }),
  sorting: [
    { columnName: 'product', direction: 'asc' },
    { columnName: 'saleDate', direction: 'asc' },
  ],
  grouping: [{ columnName: 'product' }],
  expandedGroups: ['EnviroCare Max'],
  selection: [],
  filters: [{ columnName: 'saleDate', value: 'Feb' }],
  currentPage: 0,
};

const gridReducer = (state = gridInitialState, action) => {
  if (action.type === GRID_STATE_CHANGE_ACTION) {
    const nextState = Object.assign(
      {},
      state,
      {
        [action.partialStateName]: action.partialStateValue,
      },
    );
    return nextState;
  }
  return state;
};

export const createGridAction = (partialStateName, partialStateValue) => ({
  type: GRID_STATE_CHANGE_ACTION,
  partialStateName,
  partialStateValue,
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);

const store = createStore(
  gridReducer,
  // Enabling Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const ReduxIntegrationDemo = () => (
  <Provider store={store}>
    <ReduxGridContainer />
  </Provider>
);
