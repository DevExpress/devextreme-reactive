import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, ActionFn,
} from '@devexpress/dx-react-core';
import { toggleRowExpanded, ToggleRowPayload } from '@devexpress/dx-grid-core';
import { TreeDataStateProps, TreeDataStateState } from '../types';

class TreeDataStateBase extends React.PureComponent<TreeDataStateProps, TreeDataStateState> {
  static defaultProps = {
    defaultExpandedRowIds: [],
  };
  toggleRowExpanded: ActionFn<ToggleRowPayload>;

  constructor(props) {
    super(props);

    this.state = {
      expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
    };

    const stateHelper = createStateHelper(
      this,
      {
        expandedRowIds: () => {
          const { onExpandedRowIdsChange } = this.props;
          return onExpandedRowIdsChange;
        },
      },
    );

    this.toggleRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRowIds', toggleRowExpanded);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      expandedRowIds = prevState.expandedRowIds,
    } = nextProps;

    return {
      expandedRowIds,
    };
  }

  render() {
    const { expandedRowIds } = this.state;

    return (
      <Plugin
        name="TreeDataState"
      >
        <Getter name="expandedRowIds" value={expandedRowIds} />
        {' '}
        {/* collision =( */}
        <Action name="toggleRowExpanded" action={this.toggleRowExpanded} />
      </Plugin>
    );
  }
}

/** A plugin that manages the expanded state for tree rows. */
export const TreeDataState: React.ComponentType<TreeDataStateProps> = TreeDataStateBase;
