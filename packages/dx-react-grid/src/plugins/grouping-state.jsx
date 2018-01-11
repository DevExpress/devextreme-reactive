import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  toggleExpandedGroups,
  draftGrouping,
  draftGroupingChange,
  cancelGroupingChange,
} from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const dependencies = [
  { pluginName: 'SortingState', optional: true },
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
      groupingChange: null,
      expandedGroups: props.defaultExpandedGroups,
    };

    this.stateHelper = createStateHelper(this);

    this.groupByColumn = this.groupByColumn.bind(this);
    this.toggleGroupExpanded = this.stateHelper.applyReducer
      .bind(this.stateHelper, toggleExpandedGroups);
    this.draftGroupingChange = this.stateHelper.applyReducer
      .bind(this.stateHelper, draftGroupingChange);
    this.cancelGroupingChange = this.stateHelper.applyReducer
      .bind(this.stateHelper, cancelGroupingChange);
    this.changeColumnSorting = this.changeColumnSorting.bind(this);
  }
  getState() {
    return {
      ...this.state,
      grouping: this.props.grouping || this.state.grouping,
      expandedGroups: this.props.expandedGroups || this.state.expandedGroups,
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
  groupByColumn({ columnName, groupIndex }, getters, actions) {
    this.stateHelper.applyReducer(
      groupByColumn,
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
    const { grouping, groupingChange, expandedGroups } = this.getState();

    return (
      <PluginContainer
        pluginName="GroupingState"
        dependencies={dependencies}
      >
        <Getter name="grouping" value={grouping} />
        <Getter name="draftGrouping" value={draftGrouping(grouping, groupingChange)} />
        <Getter name="expandedGroups" value={expandedGroups} />

        <Action name="groupByColumn" action={this.groupByColumn} />
        <Action name="toggleGroupExpanded" action={this.toggleGroupExpanded} />
        <Action name="draftGroupingChange" action={this.draftGroupingChange} />
        <Action name="cancelGroupingChange" action={this.cancelGroupingChange} />

        <Action name="changeColumnSorting" action={this.changeColumnSorting} />
      </PluginContainer>
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
