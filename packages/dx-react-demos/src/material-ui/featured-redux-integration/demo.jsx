import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState, RowDetailState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow, TableRowDetail,
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../demo-data/generator';

const columns = [
  { name: 'prefix', title: 'Title' },
  { name: 'firstName', title: 'First Name' },
  { name: 'lastName', title: 'Last Name' },
  { name: 'position', title: 'Position' },
  { name: 'state', title: 'State' },
  { name: 'birthDate', title: 'Birth Date' },
];
const detailColumns = [
  { name: 'subject', title: 'Subject' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'dueDate', title: 'Due Date' },
  { name: 'priority', title: 'Priority' },
  { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
  { columnName: 'startDate', width: 115 },
  { columnName: 'dueDate', width: 115 },
  { columnName: 'priority', width: 100 },
  { columnName: 'status', width: 125 },
];

const styles = {
  detailContainer: {
    margin: 20,
  },
};

export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div>
      <h5>{row.firstName} {row.lastName}&apos;s Tasks:</h5>
    </div>
    <Paper>
      <Grid
        rows={row.tasks}
        columns={detailColumns}
      >
        <Table
          columnExtensions={tableDetailColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
);
GridDetailContainerBase.propTypes = {
  row: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const GridDetailContainer = withStyles(styles, { name: 'ReduxIntegrationDemo' })(GridDetailContainerBase);

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  rows,
  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  grouping,
  onGroupingChange,
  expandedGroups,
  onExpandedGroupsChange,
  filters,
  onFiltersChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Paper>
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
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChange}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChange}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />
      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />
      <IntegratedSelection />

      <DragDropProvider />

      <Table />

      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />

      <TableHeaderRow showSortingControls />
      <TableFilterRow />
      <TableSelection showSelectAll />
      <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      />
      <TableGroupRow />
      <Toolbar />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
    </Grid>
  </Paper>
);

GridContainer.propTypes = {
  rows: PropTypes.array.isRequired,
  sorting: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  expandedRowIds: PropTypes.array.isRequired,
  onExpandedRowIdsChange: PropTypes.func.isRequired,
  grouping: PropTypes.array.isRequired,
  onGroupingChange: PropTypes.func.isRequired,
  expandedGroups: PropTypes.array.isRequired,
  onExpandedGroupsChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  columnOrder: PropTypes.array.isRequired,
  onColumnOrderChange: PropTypes.func.isRequired,
  columnWidths: PropTypes.array.isRequired,
  onColumnWidthsChange: PropTypes.func.isRequired,
};

const gridInitialState = {
  rows: generateRows({
    columnValues: {
      ...employeeValues,
      tasks: ({ random }) => generateRows({
        columnValues: employeeTaskValues,
        length: Math.floor(random() * 3) + 4,
        random,
      }),
    },
    length: 40,
  }),
  sorting: [],
  grouping: [],
  expandedGroups: [],
  selection: [],
  expandedRowIds: [1],
  filters: [],
  currentPage: 0,
  pageSize: 10,
  pageSizes: [5, 10, 15],
  columnOrder: ['prefix', 'firstName', 'lastName', 'position', 'state', 'birthDate'],
  columnWidths: [
    { columnName: 'prefix', width: 75 },
    { columnName: 'firstName', width: 130 },
    { columnName: 'lastName', width: 130 },
    { columnName: 'position', width: 170 },
    { columnName: 'state', width: 125 },
    { columnName: 'birthDate', width: 115 },
  ],
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
  onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);

const store = createStore(
  gridReducer,
  // Enabling Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension)
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default () => (
  <Provider store={store}>
    <ReduxGridContainer />
  </Provider>
);
