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
    isGroupByDate: () => false,
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
    const { isGroupByDate } = this.props;

    return (
      <Plugin name="GroupingState">
        <Getter name="grouping" value={grouping} />
        <Getter name="isGroupByDate" value={isGroupByDate} />

        <Getter name="expandedGroups" value={expandedGroups} />
        <Action name="toggleGroupExpanded" action={this.toggleGroupExpanded} />
      </Plugin>
    );
  }
}

/** A plugin that manages the grouping state. */
export const GroupingState: React.ComponentType<GroupingStateProps> = GroupingStateBase;
