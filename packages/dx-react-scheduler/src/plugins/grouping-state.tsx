import * as React from 'react';
import {
  Action, Plugin, Getter, StateHelper, ActionFn, createStateHelper,
} from '@devexpress/dx-react-core';
import {
  ToggleGroupPayload, toggleExpandedGroups,
} from '@devexpress/dx-scheduler-core';
import { GroupingStateProps, GroupingStateState } from '../types';

class GroupingStateBase extends React.PureComponent<GroupingStateProps, GroupingStateState> {
  static defaultProps = {
    defaultExpandedGroups: [],
  };
  stateHelper: StateHelper;
  toggleGroupExpanded: ActionFn<ToggleGroupPayload>;

  constructor(props) {
    super(props);

    this.state = {
      grouping: props.grouping,
      expandedGroups: props.expandedGroups || props.defaultExpandedGroups,
    };
    this.stateHelper = createStateHelper(
      this,
      {
        expandedGroups: () => {
          const { onExpandedGroupsChange } = this.props;
          return onExpandedGroupsChange;
        },
      },
    );
    this.toggleGroupExpanded = this.stateHelper.applyReducer
      .bind(this.stateHelper, toggleExpandedGroups);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      grouping = prevState.grouping,
      expandedGroups = prevState.expandedGroups,
    } = nextProps;

    return { grouping, expandedGroups };
  }

  render() {
    const { grouping, expandedGroups } = this.state;

    return (
      <Plugin name="GroupingState">
        <Getter name="grouping" value={grouping} />

        <Getter name="expandedGroups" value={expandedGroups} />
        <Action name="toggleGroupExpanded" action={this.toggleGroupExpanded} />
      </Plugin>
    );
  }
}

/***
 * A plugin that manages the grouping state.
 * It lists resources used for grouping and stores information about expanded/collapsed groups.
 * */
export const GroupingState: React.ComponentType<GroupingStateProps> = GroupingStateBase;
