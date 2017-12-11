import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
} from '@devexpress/dx-grid-core';

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.defaultSelection || [],
    };

    this.toggleSelection = (payload) => {
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

    return (
      <PluginContainer
        pluginName="SelectionState"
      >
        <Getter name="selection" value={new Set(selection)} />
        <Action name="toggleSelection" action={this.toggleSelection} />
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
