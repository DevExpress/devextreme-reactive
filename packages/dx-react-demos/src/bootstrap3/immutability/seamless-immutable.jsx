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

const rows = generateRows({ length: 14 });
const columns = [
  { name: 'name', title: 'Name' },
  { name: 'sex', title: 'Sex' },
  { name: 'city', title: 'City' },
  { name: 'car', title: 'Car' },
];

const SORTING_STATE_CHANGE_ACTION = 'SORTING_STATE_CHANGE';
const SELECTION_STATE_CHANGE_ACTION = 'SELECTION_STATE_CHANGE';

const initialSelectionState = {
  data: Immutable([]),
};

const initialSortingState = {
  data: Immutable([]),
};

const selectionStateReducer = (state = initialSelectionState, action) => {
  const { type, payload } = action;
  if (type === SELECTION_STATE_CHANGE_ACTION) {
    return { data: Immutable(payload) };
  }
  return state;
};

const sortingStateReducer = (state = initialSortingState, action) => {
  const { type, payload } = action;
  if (type === SORTING_STATE_CHANGE_ACTION) {
    return { data: Immutable(payload) };
  }
  return state;
};

const rootReducer = combineReducers({
  selection: selectionStateReducer,
  sorting: sortingStateReducer,
});

const mapSortingStateToProps = ({ sorting }) => ({
  sorting: sorting.data,
});

const mapSelectionStateToProps = ({ selection }) => ({
  selection: selection.data,
});

const mapSortingDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch({
    type: SORTING_STATE_CHANGE_ACTION,
    payload: sorting,
  }),
});

const mapSelectionDispatchToProps = dispatch => ({
  onSelectionChange: selection => dispatch({
    type: SELECTION_STATE_CHANGE_ACTION,
    payload: selection,
  }),
});

// NOTE: not sure about the *Container postfix here
// Maybe SortingStateComponent?
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

const GridContainer = () => (
  <Grid
    rows={rows}
    columns={columns}
  >
    <ReduxSortingStateContainer />
    <LocalSorting />
    <ReduxSelectionStateContainer />
    <Table />
    <TableHeaderRow allowSorting />
    <TableSelection />
  </Grid>
);

const ReduxSortingStateContainer =
  connect(mapSortingStateToProps, mapSortingDispatchToProps)(SortingStateContainer);
const ReduxSelectionStateContainer =
  connect(mapSelectionStateToProps, mapSelectionDispatchToProps)(SelectionStateContainer);

const store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    <GridContainer />
  </Provider>
);
