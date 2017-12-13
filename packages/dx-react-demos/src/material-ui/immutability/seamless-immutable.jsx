import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, SelectionState,
  LocalSorting, LocalSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';

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

const store = createStore(rootReducer);

const Sorting = ({
  sorting,
  onSortingChange,
}) => (
  <SortingState
    sorting={sorting.asMutable()}
    onSortingChange={onSortingChange}
  />
);

Sorting.propTypes = {
  sorting: PropTypes.array.isRequired,
  onSortingChange: PropTypes.func.isRequired,
};

const mapSortingStateToProps = ({ sorting }) => ({
  sorting: sorting.data,
});

const mapSortingDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch({
    type: SORTING_STATE_CHANGE_ACTION,
    payload: sorting,
  }),
});

const SortingStateContainer =
  connect(mapSortingStateToProps, mapSortingDispatchToProps)(Sorting);

const Selection = ({
  selection,
  onSelectionChange,
}) => (
  <SelectionState
    selection={selection.asMutable()}
    onSelectionChange={onSelectionChange}
  />
);

Selection.propTypes = {
  selection: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

const mapSelectionStateToProps = ({ selection }) => ({
  selection: selection.data,
});

const mapSelectionDispatchToProps = dispatch => ({
  onSelectionChange: selection => dispatch({
    type: SELECTION_STATE_CHANGE_ACTION,
    payload: selection,
  }),
});

const SelectionStateContainer =
  connect(mapSelectionStateToProps, mapSelectionDispatchToProps)(Selection);

export default () => (
  <Provider store={store}>
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingStateContainer />
        <SelectionStateContainer />
        <LocalSorting />
        <LocalSelection />
        <Table />
        <TableHeaderRow allowSorting />
        <TableSelection />
      </Grid>
    </Paper>
  </Provider>
);
