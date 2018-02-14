import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { toggleRowExpanded } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class TreeDataState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedRowIds: props.defaultExpandedRowIds,
    };

    const stateHelper = createStateHelper(this);

    this.toggleRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRowIds', toggleRowExpanded);
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
      <Plugin
        name="TreeDataState"
      >
        <Getter name="expandedRowIds" value={expandedRowIds} /> {/* collision =( */}
        <Action name="toggleRowExpanded" action={this.toggleRowExpanded} />
      </Plugin>
    );
  }
}

TreeDataState.propTypes = {
  expandedRowIds: PropTypes.array,
  defaultExpandedRowIds: PropTypes.array,
  onExpandedRowIdsChange: PropTypes.func,
};

TreeDataState.defaultProps = {
  expandedRowIds: undefined,
  defaultExpandedRowIds: [],
  onExpandedRowIdsChange: undefined,
};
