import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { SortingState } from '@devexpress/dx-react-grid';
import Immutable from 'seamless-immutable';

export const SORTING_STATE_CHANGE_ACTION = 'SORTING_STATE_CHANGE';

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

const initialState = {
  data: Immutable({
    sorting: [],
  }),
};

const sortingStateReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SORTING_STATE_CHANGE_ACTION) {
    return { data: state.data.set('sorting', payload) };
  }
  return state;
};

const mapStateToProps = ({ data }) => data;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch({
    type: SORTING_STATE_CHANGE_ACTION,
    payload: sorting,
  }),
});

const ReduxSortingStateContainer =
  connect(mapStateToProps, mapDispatchToProps)(SortingStateContainer);

const store = createStore(sortingStateReducer);

export default () => (
  <Provider store={store}>
    <ReduxSortingStateContainer />
  </Provider>
);
