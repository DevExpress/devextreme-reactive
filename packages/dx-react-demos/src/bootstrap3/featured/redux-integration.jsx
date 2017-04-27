/* global window */

import React from 'react';
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

    sortings,
    sortingsChange,
    selection,
    selectionChange,
    grouping,
    groupingChange,
    expandedGroups,
    expandedGroupsChange,
    filters,
    filtersChange,
    currentPage,
    currentPageChange,
  } = props;

  return (
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
      <GroupingState
        grouping={grouping}
        groupingChange={groupingChange}
        expandedGroups={expandedGroups}
        expandedGroupsChange={expandedGroupsChange}
      />
      <PagingState
        currentPage={currentPage}
        currentPageChange={currentPageChange}
        pageSize={10}
      />

      <LocalFiltering />
      <LocalSorting />
      <LocalGrouping />
      <LocalPaging />

      <SelectionState
        selection={selection}
        selectionChange={selectionChange}
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

      <TableHeaderRow />
      <TableFilterRow />
      <PagingPanel />
      <TableSelection />
      <TableGroupRow />
      <GroupingPanel />

    </DataGrid>
  );
};
GridContainer.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  sortings: React.PropTypes.array.isRequired,
  sortingsChange: React.PropTypes.func.isRequired,
  selection: React.PropTypes.array.isRequired,
  selectionChange: React.PropTypes.func.isRequired,
  grouping: React.PropTypes.array.isRequired,
  groupingChange: React.PropTypes.func.isRequired,
  expandedGroups: React.PropTypes.object.isRequired,
  expandedGroupsChange: React.PropTypes.func.isRequired,
  filters: React.PropTypes.array.isRequired,
  filtersChange: React.PropTypes.func.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  currentPageChange: React.PropTypes.func.isRequired,
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
  sortings: [
    { column: 'product', direction: 'asc' },
    { column: 'saleDate', direction: 'asc' },
  ],
  grouping: [{ column: 'product' }],
  expandedGroups: { 'EnviroCare Max': true },
  selection: [],
  filters: [{ column: 'saleDate', value: 'Feb' }],
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
  sortingsChange: sortings => dispatch(createGridAction('sortings', sortings)),
  selectionChange: selection => dispatch(createGridAction('selection', selection)),
  groupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  expandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  filtersChange: filters => dispatch(createGridAction('filters', filters)),
  currentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
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
