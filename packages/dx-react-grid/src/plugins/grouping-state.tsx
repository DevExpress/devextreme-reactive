import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn, Getters, Actions,
} from '@devexpress/dx-react-core';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
  getColumnExtensionValueGetter,
  adjustSortIndex,
  ChangeGroupingPayload,
  ToggleGroupPayload,
  ChangeSortingPayload,
} from '@devexpress/dx-grid-core';
import { GroupingStateProps, GroupingStateState } from '../types';

const dependencies = [
  { name: 'SortingState', optional: true },
];

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'groupingEnabled', defaultValue);

class GroupingStateBase extends React.PureComponent<GroupingStateProps, GroupingStateState> {
  static defaultProps = {
    defaultGrouping: [],
    defaultExpandedGroups: [],
    columnGroupingEnabled: true,
  };
  stateHelper: StateHelper;
  draftColumnGrouping: ActionFn<ChangeGroupingPayload>;
  toggleGroupExpanded: ActionFn<ToggleGroupPayload>;
  cancelColumnGroupingDraft: ActionFn<void>;

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
        grouping: () => {
          const { onGroupingChange } = this.props;
          return onGroupingChange;
        },
        expandedGroups: () => {
          const { onExpandedGroupsChange } = this.props;
          return onExpandedGroupsChange;
        },
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      grouping = prevState.grouping,
      expandedGroups = prevState.expandedGroups,
    } = nextProps;

    return {
      grouping,
      expandedGroups,
    };
  }

  changeColumnSorting(
    { columnName, keepOther, ...restParams }: ChangeSortingPayload,
    { sorting }: Getters,
    { changeColumnSorting }: Actions,
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
      sortIndex,
      keepOther: true,
      ...restParams,
    });
    return false;
  }

  changeColumnGrouping(
    { columnName, groupIndex }: ChangeGroupingPayload,
    getters?: Getters,
    actions?: Actions,
  ) {
    this.stateHelper.applyReducer(
      changeColumnGrouping,
      { columnName, groupIndex },
      (nextState, state) => {
        const { grouping } = nextState;
        const { grouping: prevGrouping } = state;
        const { sorting } = getters!;
        const { changeColumnSorting } = actions!;

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
          sortIndex,
          keepOther: true,
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

/***
 * A plugin that manages the grouping state. It lists columns used for grouping and stores
 * information about expanded/collapsed groups.
 * */
export const GroupingState: React.ComponentType<GroupingStateProps> = GroupingStateBase;
