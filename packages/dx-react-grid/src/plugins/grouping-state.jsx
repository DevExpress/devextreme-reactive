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

const adjustSortIndex = (sortIndex, grouping, sorting) =>
  Math.min(
    grouping.reduce(
      (acc, columnGrouping) => {
        const columnSortingIndex = sorting.findIndex(columnSorting =>
          columnSorting.columnName === columnGrouping.columnName);
        return (columnSortingIndex === -1 ? acc : acc + 1);
      },
      0,
    ),
    sortIndex,
  );

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

    const sortIndex = adjustSortIndex(groupingIndex, grouping, sorting);
    setColumnSorting({
      columnName,
      keepOther: true,
      sortIndex,
      ...restParams,
    });
    return false;
  }
  groupByColumn({ columnName, groupIndex }, { sorting }, { setColumnSorting }) {
    const { grouping: prevGrouping } = this.state;
    const { grouping } = this.applyReducer(groupByColumn, { columnName, groupIndex });

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

    setColumnSorting({
      keepOther: true,
      sortIndex,
      ...sorting[columnSortingIndex],
    });
  }
  applyReducer(reduce, payload) {
    const prevState = this.getState();
    const statePart = reduce(prevState, payload);
    this.setState(statePart);
    const state = { ...prevState, ...statePart };

    const { grouping } = state;
    const { onGroupingChange } = this.props;
    if (onGroupingChange && grouping !== prevState.grouping) {
      onGroupingChange(grouping);
    }

    const { expandedGroups } = state;
    const { onExpandedGroupsChange } = this.props;
    if (onExpandedGroupsChange && expandedGroups !== prevState.expandedGroups) {
      onExpandedGroupsChange(expandedGroups);
    }

    return state;
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
