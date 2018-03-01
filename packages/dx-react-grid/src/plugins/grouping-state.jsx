import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
  getColumnExtensionValueGetter,
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

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'groupingEnabled', defaultValue);

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.grouping || props.defaultGrouping,
      draftGrouping: null,
      expandedGroups: props.expandedGroups || props.defaultExpandedGroups,
    };

    this.stateHelper = createStateHelper(
      this,
      {
        grouping: () => this.props.onGroupingChange,
        expandedGroups: () => this.props.onExpandedGroupsChange,
      },
    );

    this.changeColumnGrouping = this.changeColumnGrouping.bind(this);
    this.toggleGroupExpanded = this.stateHelper.applyReducer
      .bind(this.stateHelper, toggleExpandedGroups);
    this.draftColumnGrouping = this.stateHelper.applyReducer
      .bind(this.stateHelper, draftColumnGrouping);
    this.cancelColumnGroupingDraft = this.stateHelper.applyReducer
      .bind(this.stateHelper, cancelColumnGroupingDraft);
    this.changeColumnSorting = this.changeColumnSorting.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {
      grouping,
      expandedGroups,
    } = nextProps;
    this.setState({
      ...grouping !== undefined ? { grouping } : null,
      ...expandedGroups !== undefined ? { expandedGroups } : null,
    });
  }
  changeColumnSorting(
    { columnName, keepOther, ...restParams },
    { sorting },
    { changeColumnSorting },
  ) {
    const { grouping } = this.state;
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
  render() {
    const { grouping, draftGrouping, expandedGroups } = this.state;
    const { columnExtensions, columnGroupingEnabled } = this.props;

    return (
      <Plugin
        name="GroupingState"
        dependencies={dependencies}
      >
        <Getter name="grouping" value={grouping} />
        <Getter name="draftGrouping" value={draftGrouping || grouping} />
        <Getter
          name="isColumnGroupingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnGroupingEnabled)}
        />
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
  columnExtensions: PropTypes.array,
  columnGroupingEnabled: PropTypes.bool,
};

GroupingState.defaultProps = {
  grouping: undefined,
  defaultGrouping: [],
  onGroupingChange: undefined,
  expandedGroups: undefined,
  defaultExpandedGroups: [],
  onExpandedGroupsChange: undefined,
  columnExtensions: undefined,
  columnGroupingEnabled: true,
};
