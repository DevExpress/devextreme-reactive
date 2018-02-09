import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
} from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const dependencies = [
  { name: 'SortingState', optional: true },
];

const adjustSortIndex = (sortIndex, grouping, sorting) =>
  Math.max(
    grouping.slice(0, sortIndex).reduce(
      (acc, columnGrouping) => {
        const columnSortingIndex = sorting.findIndex(columnSorting =>
          columnSorting.columnName === columnGrouping.columnName);
        return (columnSortingIndex === -1 ? acc - 1 : acc);
      },
      sortIndex,
    ),
    0,
  );

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping,
      draftGrouping: null,
      expandedGroups: props.defaultExpandedGroups,
    };

    this.stateHelper = createStateHelper(this);

    this.changeColumnGrouping = this.changeColumnGrouping.bind(this);
    this.toggleGroupExpanded = this.stateHelper.applyReducer
      .bind(this.stateHelper, toggleExpandedGroups);
    this.draftColumnGrouping = this.stateHelper.applyReducer
      .bind(this.stateHelper, draftColumnGrouping);
    this.cancelColumnGroupingDraft = this.stateHelper.applyReducer
      .bind(this.stateHelper, cancelColumnGroupingDraft);
    this.changeColumnSorting = this.changeColumnSorting.bind(this);
  }
  getState() {
    const {
      grouping = this.state.grouping,
      expandedGroups = this.state.expandedGroups,
    } = this.props;
    return {
      ...this.state,
      grouping,
      expandedGroups,
    };
  }
  changeColumnSorting(
    { columnName, keepOther, ...restParams },
    { sorting },
    { changeColumnSorting },
  ) {
    const { grouping } = this.getState();
    const groupingIndex = grouping
      .findIndex(columnGrouping => columnGrouping.columnName === columnName);
    if (groupingIndex === -1) {
      changeColumnSorting({
        columnName,
        keepOther: keepOther || grouping.map(columnGrouping => columnGrouping.columnName),
        ...restParams,
      });
      return false;
    }

    const sortIndex = adjustSortIndex(groupingIndex, grouping, sorting);
    changeColumnSorting({
      columnName,
      keepOther: true,
      sortIndex,
      ...restParams,
    });
    return false;
  }
  changeColumnGrouping({ columnName, groupIndex }, getters, actions) {
    this.stateHelper.applyReducer(
      changeColumnGrouping,
      { columnName, groupIndex },
      (nextState, state) => {
        const { grouping } = nextState;
        const { grouping: prevGrouping } = state;
        const { sorting } = getters;
        const { changeColumnSorting } = actions;

        if (!sorting) return;

        const columnSortingIndex = sorting
          .findIndex(columnSorting => columnSorting.columnName === columnName);
        const prevGroupingIndex = prevGrouping
          .findIndex(columnGrouping => columnGrouping.columnName === columnName);
        const groupingIndex = grouping
          .findIndex(columnGrouping => columnGrouping.columnName === columnName);

        if (columnSortingIndex === -1
          || (prevGroupingIndex === prevGrouping.length - 1 && groupingIndex === -1)) return;

        const sortIndex = adjustSortIndex(
          groupingIndex === -1 ? grouping.length : groupingIndex,
          grouping,
          sorting,
        );

        if (columnSortingIndex === sortIndex) return;

        changeColumnSorting({
          keepOther: true,
          sortIndex,
          ...sorting[columnSortingIndex],
        });
      },
    );
  }
  notifyStateChange(nextState, state) {
    const { grouping } = nextState;
    const { onGroupingChange } = this.props;
    if (onGroupingChange && grouping !== state.grouping) {
      onGroupingChange(grouping);
    }

    const { expandedGroups } = nextState;
    const { onExpandedGroupsChange } = this.props;
    if (onExpandedGroupsChange && expandedGroups !== state.expandedGroups) {
      onExpandedGroupsChange(expandedGroups);
    }
  }
  render() {
    const { grouping, draftGrouping, expandedGroups } = this.getState();

    return (
      <Plugin
        name="GroupingState"
        dependencies={dependencies}
      >
        <Getter name="grouping" value={grouping} />
        <Getter name="draftGrouping" value={draftGrouping || grouping} />
        <Action name="changeColumnGrouping" action={this.changeColumnGrouping} />
        <Action name="draftColumnGrouping" action={this.draftColumnGrouping} />
        <Action name="cancelColumnGroupingDraft" action={this.cancelColumnGroupingDraft} />

        <Getter name="expandedGroups" value={expandedGroups} />
        <Action name="toggleGroupExpanded" action={this.toggleGroupExpanded} />

        <Action name="changeColumnSorting" action={this.changeColumnSorting} />
      </Plugin>
    );
  }
}

GroupingState.propTypes = {
  grouping: PropTypes.array,
  defaultGrouping: PropTypes.array,
  onGroupingChange: PropTypes.func,
  expandedGroups: PropTypes.array,
  defaultExpandedGroups: PropTypes.array,
  onExpandedGroupsChange: PropTypes.func,
};

GroupingState.defaultProps = {
  grouping: undefined,
  defaultGrouping: [],
  onGroupingChange: undefined,
  expandedGroups: undefined,
  defaultExpandedGroups: [],
  onExpandedGroupsChange: undefined,
};
