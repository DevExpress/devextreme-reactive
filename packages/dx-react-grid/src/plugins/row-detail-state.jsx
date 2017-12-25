import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setDetailRowExpanded } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class RowDetailState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedRows: props.defaultExpandedRows || [],
    };

    const stateHelper = createStateHelper(this);

    this.setDetailRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRows', setDetailRowExpanded);
  }
  getState() {
    return {
      ...this.state,
      expandedRows: this.props.expandedRows || this.state.expandedRows,
    };
  }
  notifyStateChange(nextState, state) {
    const { expandedRows } = nextState;
    const { onExpandedRowsChange } = this.props;
    if (onExpandedRowsChange && expandedRows !== state.expandedRows) {
      onExpandedRowsChange(expandedRows);
    }
  }
  render() {
    const { expandedRows } = this.getState();

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
