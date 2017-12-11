import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
  getAvailableSelection,
  getAvailableToSelect,
} from '@devexpress/dx-grid-core';

const availableToSelectComputed = ({ rows, getRowId, isGroupRow }) =>
  getAvailableToSelect(rows, getRowId, isGroupRow);

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.defaultSelection || [],
    };

    this.setRowsSelection = (payload) => {
      this.applyReducer(state => ({
        selection: setRowsSelection(state.selection, payload),
      }));
    };
  }
  getState(temporaryState) {
    return {
      ...this.state,
      selection: this.props.selection || this.state.selection,
      ...(this.state !== temporaryState ? temporaryState : null),
    };
  }
  applyReducer(reduce, payload) {
    const stateUpdater = (prevState) => {
      const state = this.getState(prevState);
      const nextState = { ...state, ...reduce(state, payload) };

      if (stateUpdater === this.lastStateUpdater) {
        this.notifyStateChange(nextState, state);
      }

      return nextState;
    };
    this.lastStateUpdater = stateUpdater;

    this.setState(stateUpdater);
  }
  notifyStateChange(nextState, state) {
    const { selection } = nextState;
    const { onSelectionChange } = this.props;
    if (onSelectionChange && selection !== state.selection) {
      onSelectionChange(selection);
    }
  }
  render() {
    const selection = this.props.selection || this.state.selection;

    const selectionComputed = ({ availableToSelect }) =>
      getAvailableSelection(selection, availableToSelect);

    return (
      <PluginContainer
        pluginName="SelectionState"
      >
        <Getter name="availableToSelect" computed={availableToSelectComputed} />
        <Getter name="selection" computed={selectionComputed} />
        <Action name="setRowsSelection" action={this.setRowsSelection} />
      </PluginContainer>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.array,
  defaultSelection: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: undefined,
  onSelectionChange: undefined,
};
