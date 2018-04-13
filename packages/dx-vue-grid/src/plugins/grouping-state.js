import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
  getColumnExtensionValueGetter,
  adjustSortIndex,
} from '@devexpress/dx-grid-core';

const dependencies = [
  { name: 'SortingState', optional: true },
];

const callback = (
  { grouping },
  { grouping: prevGrouping },
  { sorting },
  { changeColumnSorting },
  columnName,
) => {
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
};

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'groupingEnabled', defaultValue);

export const GroupingState = {
  name: 'GroupingState',
  props: {
    grouping: {
      type: Array,
    },
    expandedGroups: {
      type: Array,
    },
    columnExtensions: {
      type: Array,
    },
    columnGroupingEnabled: {
      type: Boolean,
    },
  },
  methods: {
    changeColumnSorting(
      { columnName, keepOther, ...restParams },
      { sorting },
      { changeColumnSorting },
    ) {
      const { grouping } = this;
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
    },
    changeColumnGrouping({ columnName, groupingIndex }, getters, actions) {
      const prevState = {
        grouping: this.grouping,
        expandedGroups: this.expandedGroups,
      };
      const stateChange = changeColumnGrouping(prevState, { columnName, groupingIndex });

      this.$emit('update:grouping', stateChange.grouping);
      this.$emit('update:expandedGroups', stateChange.expandedGroups);

      callback({ ...prevState, ...stateChange }, prevState, getters, actions, columnName);
    },
    draftColumnGrouping(payload) {
      return draftColumnGrouping(payload);
    },
    toggleGroupExpanded(payload) {
      return toggleExpandedGroups(payload);
    },
    cancelColumnGroupingDraft(payload) {
      return cancelColumnGroupingDraft(payload);
    },
  },
  render() {
    const { grouping, draftGrouping, expandedGroups } = this;
    const { columnExtensions, columnGroupingEnabled } = this;

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
  },
};
