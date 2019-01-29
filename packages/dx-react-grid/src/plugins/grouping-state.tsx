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
  Grouping,
  GroupKey,
  ChangeGroupingPayload,
  ToggleGroupPayload,
  ChangeSortingPayload,
} from '@devexpress/dx-grid-core';

// tslint:disable-next-line:no-namespace
export namespace GroupingState {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether grouping is enabled for a column. */
    groupingEnabled: boolean;
  }
}
export interface GroupingStateProps {
  /** Specifies columns to group by. */
  grouping?: Array<Grouping>;
  /** Specifies initial grouping options in the uncontrolled mode. */
  defaultGrouping?: Array<Grouping>;
  /** Handles grouping option changes. */
  onGroupingChange?: (grouping: Array<Grouping>) => void;
  /** Specifies expanded groups. */
  expandedGroups?: Array<GroupKey>;
  /** Specifies initially expanded groups in the uncontrolled mode. */
  defaultExpandedGroups?: Array<GroupKey>;
  /** Specifies whether grouping is enabled for all columns. */
  columnGroupingEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<GroupingState.ColumnExtension>;
  /** Handles expanded group changes. */
  onExpandedGroupsChange?: (expandedGroups: Array<GroupKey>) => void;
}
interface GroupingStateState {
  grouping: Grouping[];
  draftGrouping: Grouping[] | null;
  expandedGroups: GroupKey[];
}

const dependencies = [
  { name: 'SortingState', optional: true },
];

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'groupingEnabled', defaultValue);

export class GroupingState extends React.PureComponent<GroupingStateProps, GroupingStateState> {
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
  ): boolean {
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

  changeColumnGrouping(
    { columnName, groupIndex }: ChangeGroupingPayload,
    getters: Getters | undefined,
    actions: Actions | undefined,
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
