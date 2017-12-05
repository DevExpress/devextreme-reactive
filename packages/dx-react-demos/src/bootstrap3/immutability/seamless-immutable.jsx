import React from 'react';
import PropTypes from 'prop-types';
import {
  LocalSorting,
  SortingState,
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap3';

import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import Immutable from 'seamless-immutable';

import {
  generateRows,
} from '../../demo-data/generator';

const SORTING_STATE_CHANGE_ACTION = 'SORTING_STATE_CHANGE';
const SELECTION_STATE_CHANGE_ACTION = 'SELECTION_STATE_CHANGE';

const SortingStateContainer = ({
  sorting,
  onSortingChange,
}) => (
  <SortingState
    sorting={sorting.asMutable()}
    onSortingChange={onSortingChange}
  />
);

SortingStateContainer.propTypes = {
  sorting: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
};

const SelectionStateContainer = ({
  selection,
  onSelectionChange,
}) => (
  <SelectionState
    selection={selection.asMutable()}
    onSelectionChange={onSelectionChange}
  />
);

SelectionStateContainer.propTypes = {
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

const rows = generateRows({ length: 14 });
const columns = [
  { name: 'name', title: 'Name' },
  { name: 'sex', title: 'Sex' },
  { name: 'city', title: 'City' },
  { name: 'car', title: 'Car' },
];

const GridContainer = ({
  sorting,
  selection,
  onSortingChange,
  onSelectionChange,
}) => {
  return (
    <Grid
      rows={rows}
      columns={columns}
    >
      <SortingStateContainer
        sorting={sorting}
        onSortingChange={onSortingChange}
      />
      <LocalSorting />
      <SelectionStateContainer
        selection={selection}
        onSelectionChange={onSelectionChange}
      />
      <Table />
      <TableHeaderRow allowSorting />
      <TableSelection />
    </Grid>
  );
};

GridContainer.propTypes = {
  sorting: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

const initialSelectionState = {
  data: Immutable({
    selection: [],
  }),
};

const initialSortingState = {
  data: Immutable({
    sorting: [],
  }),
};

const selectionStateReducer = (state = initialSelectionState, action) => {
  const { type, payload } = action;
  if (type === SELECTION_STATE_CHANGE_ACTION) {
    return { data: state.data.set('selection', payload) };
  }
  return state;
};

const sortingStateReducer = (state = initialSortingState, action) => {
  const { type, payload } = action;
  if (type === SORTING_STATE_CHANGE_ACTION) {
    return { data: state.data.set('sorting', payload) };
  }
  return state;
};

const rootReducer = combineReducers({
  selection: selectionStateReducer,
  sorting: sortingStateReducer,
});

const mapStateToProps = state => ({
  selection: state.selection.data.selection,
  sorting: state.sorting.data.sorting,
});

const mapDispatchToProps = dispatch => ({
  onSortingChange: (sorting) => {
    return dispatch({
      type: SORTING_STATE_CHANGE_ACTION,
      payload: sorting,
    });
  },
  onSelectionChange: (selection) => {
    return dispatch({
      type: SELECTION_STATE_CHANGE_ACTION,
      payload: selection,
    });
  },
});

const ReduxGridContainer =
  connect(mapStateToProps, mapDispatchToProps)(GridContainer);

const store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    <ReduxGridContainer />
  </Provider>
);
