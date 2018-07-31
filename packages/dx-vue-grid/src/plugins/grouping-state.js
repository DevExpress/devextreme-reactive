import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  getColumnExtensionValueGetter,
  adjustSortIndex,
} from '@devexpress/dx-grid-core';

const dependencies = [
  { name: 'DxSortingState', optional: true },
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

const columnExtensionValueGetter = (columnExtensions, defaultValue) => getColumnExtensionValueGetter(columnExtensions, 'groupingEnabled', defaultValue);

export const DxGroupingState = {
  name: 'DxGroupingState',
  props: {
    grouping: {
      type: Array,
      required: true,
    },
    expandedGroups: {
      type: Array,
      required: true,
    },
    columnExtensions: {
      type: Array,
      default: () => [],
    },
    columnGroupingEnabled: {
      type: Boolean,
      default: true,
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

      callback({ ...prevState, ...stateChange }, prevState, getters, actions, columnName);
    },
    toggleGroupExpanded({ groupKey }) {
      this.$emit(
        'update:expandedGroups',
        toggleExpandedGroups({ expandedGroups: this.expandedGroups }, { groupKey }).expandedGroups,
      );
    },
  },
  render() {
    const { grouping, expandedGroups } = this;
    const { columnExtensions, columnGroupingEnabled } = this;

    return (
      <DxPlugin
        name="DxGroupingState"
        dependencies={dependencies}
      >
        <DxGetter name="grouping" value={grouping} />
        <DxGetter
          name="isColumnGroupingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnGroupingEnabled)}
        />
        <DxAction name="changeColumnGrouping" action={this.changeColumnGrouping} />
        <DxGetter name="expandedGroups" value={expandedGroups} />
        <DxAction name="toggleGroupExpanded" action={this.toggleGroupExpanded} />
        <DxAction name="changeColumnSorting" action={this.changeColumnSorting} />
      </DxPlugin>
    );
  },
};
