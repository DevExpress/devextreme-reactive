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

const dependencies = [
  { pluginName: 'SortingState', optional: true },
];

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping,
      groupingChange: null,
      expandedGroups: props.defaultExpandedGroups,
    };

    this.groupByColumn = this.groupByColumn.bind(this);
    this.toggleGroupExpanded = this.applyReducer.bind(this, toggleExpandedGroups);
    this.draftGroupingChange = this.applyReducer.bind(this, draftGroupingChange);
    this.cancelGroupingChange = this.applyReducer.bind(this, cancelGroupingChange);
    this.setColumnSorting = this.setColumnSorting.bind(this);
  }
  getState() {
    return {
      ...this.state,
      grouping: this.props.grouping || this.state.grouping,
      expandedGroups: this.props.expandedGroups || this.state.expandedGroups,
    };
  }
  setColumnSorting({ columnName, keepOther, ...restParams }, { sorting }, { setColumnSorting }) {
    const { grouping } = this.getState();
    const groupingIndex = grouping
      .findIndex(columnGrouping => columnGrouping.columnName === columnName);
    if (groupingIndex === -1) {
      setColumnSorting({
        columnName,
        keepOther: keepOther || grouping.map(columnGrouping => columnGrouping.columnName),
        ...restParams,
      });
      return false;
    }

    const sortIndex = Math.min(grouping
      .reduce(
        (acc, columnGrouping) =>
          (sorting.findIndex(columnSorting =>
            columnSorting.columnName === columnGrouping.columnName) === -1
            ? acc
            : acc + 1),
        0), groupingIndex);
    setColumnSorting({
      columnName,
      keepOther: true,
      sortIndex,
      ...restParams,
    });
    return false;
  }
  groupByColumn({ columnName, groupIndex }, { sorting }, { setColumnSorting }) {
    const { grouping } = this.state;
    const { grouping: newGrouping } = this.applyReducer(groupByColumn, { columnName, groupIndex });

    if (!sorting) return;

    const columnSortingIndex = sorting
      .findIndex(columnSorting => columnSorting.columnName === columnName);
    const groupingIndex = grouping
      .findIndex(columnGrouping => columnGrouping.columnName === columnName);
    const newGroupingIndex = newGrouping
      .findIndex(columnGrouping => columnGrouping.columnName === columnName);

    if (columnSortingIndex === -1
      || (groupingIndex === grouping.length - 1 && newGroupingIndex === -1)) return;

    const sortIndex = Math.min(newGrouping
      .reduce(
        (acc, columnGrouping) =>
          (sorting.findIndex(columnSorting =>
            columnSorting.columnName === columnGrouping.columnName) === -1
            ? acc
            : acc + 1),
        0), newGroupingIndex === -1 ? newGrouping.length : newGroupingIndex);

    if (columnSortingIndex === sortIndex) return;

    setColumnSorting({
      keepOther: true,
      sortIndex,
      ...sorting[columnSortingIndex],
    });
  }
  applyReducer(reduce, payload) {
    const state = this.getState();
    const nextState = reduce(state, payload);
    this.setState(nextState);

    const { onGroupingChange } = this.props;
    if (onGroupingChange && nextState.grouping !== state.grouping) {
      onGroupingChange(nextState.grouping);
    }

    const { onExpandedGroupsChange } = this.props;
    if (onExpandedGroupsChange && nextState.expandedGroups !== state.expandedGroups) {
      onExpandedGroupsChange(nextState.expandedGroups);
    }

    return nextState;
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
        <Getter name="expandedGroups" value={new Set(expandedGroups)} />

        <Action name="groupByColumn" action={this.groupByColumn} />
        <Action name="toggleGroupExpanded" action={this.toggleGroupExpanded} />
        <Action name="draftGroupingChange" action={this.draftGroupingChange} />
        <Action name="cancelGroupingChange" action={this.cancelGroupingChange} />

        <Action name="setColumnSorting" action={this.setColumnSorting} />
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
