import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setDetailRowExpanded } from '@devexpress/dx-grid-core';

export class RowDetailState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedRows: props.defaultExpandedRows || [],
    };

    this.setDetailRowExpanded = (payload) => {
      this.applyReducer(state => ({
        expandedRows: setDetailRowExpanded(state.expandedRows, payload),
      }));
    };
  }
  getState(temporaryState) {
    return {
      ...this.state,
      expandedRows: this.props.expandedRows || this.state.expandedRows,
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
    const { expandedRows } = nextState;
    const { onExpandedRowsChange } = this.props;
    if (onExpandedRowsChange && expandedRows !== state.expandedRows) {
      onExpandedRowsChange(expandedRows);
    }
  }
  render() {
    const expandedRows = this.props.expandedRows || this.state.expandedRows;
    return (
      <PluginContainer
        pluginName="RowDetailState"
      >
        <Getter name="expandedRows" value={expandedRows} />
        <Action name="setDetailRowExpanded" action={this.setDetailRowExpanded} />
      </PluginContainer>
    );
  }
}

RowDetailState.propTypes = {
  expandedRows: PropTypes.array,
  defaultExpandedRows: PropTypes.array,
  onExpandedRowsChange: PropTypes.func,
};

RowDetailState.defaultProps = {
  expandedRows: undefined,
  defaultExpandedRows: undefined,
  onExpandedRowsChange: undefined,
};
