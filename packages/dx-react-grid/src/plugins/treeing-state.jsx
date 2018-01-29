import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class TreeingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedRowIds: props.defaultExpandedRowIds,
    };

    const stateHelper = createStateHelper(this);

    this.toggleDetailRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRowIds', toggleDetailRowExpanded);
  }
  getState() {
    const {
      expandedRowIds = this.state.expandedRowIds,
    } = this.props;
    return {
      ...this.state,
      expandedRowIds,
    };
  }
  notifyStateChange(nextState, state) {
    const { expandedRowIds } = nextState;
    const { onExpandedRowIdsChange } = this.props;
    if (onExpandedRowIdsChange && expandedRowIds !== state.expandedRowIds) {
      onExpandedRowIdsChange(expandedRowIds);
    }
  }
  render() {
    const { expandedRowIds } = this.getState();

    return (
      <PluginContainer
        pluginName="TreeingState"
      >
        <Getter name="expandedRowIds" value={expandedRowIds} /> {/* collision =( */}
        <Action name="toggleRowExpanded" action={this.toggleDetailRowExpanded} />
      </PluginContainer>
    );
  }
}

TreeingState.propTypes = {
  expandedRowIds: PropTypes.array,
  defaultExpandedRowIds: PropTypes.array,
  onExpandedRowIdsChange: PropTypes.func,
};

TreeingState.defaultProps = {
  expandedRowIds: undefined,
  defaultExpandedRowIds: [],
  onExpandedRowIdsChange: undefined,
};
