import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState, RowDetailState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
  ColumnOrderState, TableColumnResizing,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow, TableRowDetail,
  GroupingPanel, PagingPanel, DragDropContext,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../demo-data/generator';

export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const GridDetailContainer = ({
  columns,
  data,
}) => (
  <div style={{ margin: '20px' }}>
    <div>
      <h5>{data.firstName} {data.lastName}&apos;s Tasks:</h5>
    </div>
    <Grid
      rows={data.tasks}
      columns={columns}
    >
      <TableView />
      <TableHeaderRow />
    </Grid>
  </div>
);
GridDetailContainer.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};

const GridContainer = ({
  rows,
  columns,
  detailColumns,

  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRows,
  onExpandedRowsChange,
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
  allowedPageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Grid
    rows={rows}
    columns={columns}
  >
    <ColumnOrderState
      order={columnOrder}
      onOrderChange={onColumnOrderChange}
    />

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
      expandedRows={expandedRows}
      onExpandedRowsChange={onExpandedRowsChange}
    />

    <LocalFiltering />
    <LocalSorting />
    <LocalGrouping />
    <LocalPaging />

    <SelectionState
      selection={selection}
      onSelectionChange={onSelectionChange}
    />

    <DragDropContext />

    <TableView allowColumnReordering />
    <TableColumnResizing
      columnWidths={columnWidths}
      onColumnWidthsChange={onColumnWidthsChange}
    />
    <TableHeaderRow allowSorting allowDragging allowResizing />
    <TableFilterRow />
    <TableSelection />
    <TableRowDetail
      template={({ row }) => (
        <GridDetailContainer
          data={row}
          columns={detailColumns}
        />
      )}
    />
    <GroupingPanel allowSorting allowDragging />
    <TableGroupRow />
    <PagingPanel
      allowedPageSizes={allowedPageSizes}
    />

  </Grid>
);
GridContainer.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  detailColumns: PropTypes.array.isRequired,
  sorting: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  expandedRows: PropTypes.array.isRequired,
  onExpandedRowsChange: PropTypes.func.isRequired,
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
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  columnOrder: PropTypes.array.isRequired,
  onColumnOrderChange: PropTypes.func.isRequired,
  columnWidths: PropTypes.objectOf(PropTypes.number).isRequired,
  onColumnWidthsChange: PropTypes.func.isRequired,
};

const gridInitialState = {
  columns: [
    { name: 'prefix', title: 'Title' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'position', title: 'Position' },
    { name: 'state', title: 'State' },
    { name: 'birthDate', title: 'Birth Date' },
  ],
  detailColumns: [
    { name: 'subject', title: 'Subject' },
    { name: 'startDate', title: 'Start Date', width: 115 },
    { name: 'dueDate', title: 'Due Date', width: 115 },
    { name: 'priority', title: 'Priority', width: 100 },
    {
      name: 'status', title: 'Status', caption: 'Completed', width: 125,
    },
  ],
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
  expandedRows: [1],
  filters: [],
  currentPage: 0,
  pageSize: 10,
  allowedPageSizes: [5, 10, 15],
  columnOrder: ['prefix', 'firstName', 'lastName', 'position', 'state', 'birthDate'],
  columnWidths: {
    prefix: 75,
    firstName: 130,
    lastName: 130,
    position: 170,
    state: 125,
    birthDate: 115,
  },
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
  onExpandedRowsChange: expandedRows => dispatch(createGridAction('expandedRows', expandedRows)),
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default () => (
  <Provider store={store}>
    <ReduxGridContainer />
  </Provider>
);
