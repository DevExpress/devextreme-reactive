import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { SelectionState } from '@devexpress/dx-react-grid';
import Immutable from 'seamless-immutable';

export const SELECTION_STATE_CHANGE_ACTION = 'SELECTION_STATE_CHANGE';

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

const initialState = {
  data: Immutable({
    selection: [],
  }),
};

const selectionStateReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SELECTION_STATE_CHANGE_ACTION) {
    return { data: state.data.set('selection', payload) };
  }
  return state;
};

const mapStateToProps = ({ data }) => data;

const mapDispatchToProps = dispatch => ({
  onSelectionChange: selection => dispatch({
    type: SELECTION_STATE_CHANGE_ACTION,
    payload: selection,
  }),
});

const ReduxSelectionStateContainer =
  connect(mapStateToProps, mapDispatchToProps)(SelectionStateContainer);

const store = createStore(selectionStateReducer);

export default () => (
  <Provider store={store}>
    <ReduxSelectionStateContainer />
  </Provider>
);
