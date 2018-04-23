import { Getter, Plugin } from '@devexpress/dx-vue-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  customGroupingRowIdGetter,
  customGroupedRows,
  expandedGroupRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'GroupingState' },
];

const getCollapsedRowsComputed = ({ getCollapsedRows }) =>
  groupCollapsedRowsGetter(getCollapsedRows);
const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);
const getRowIdComputed = ({ getRowId, rows }) =>
  customGroupingRowIdGetter(getRowId, rows);

export const CustomGrouping = {
  name: 'CustomGrouping',
  props: {
    getChildGroups: {
      type: Function,
      required: true,
    },
    grouping: {
      type: Array,
    },
    expandedGroups: {
      type: Array,
    },
  },
  render() {
    const {
      getChildGroups,
      grouping: appliedGrouping,
      expandedGroups: appliedExpandedGroups,
    } = this;
    const groupedRowsComputed = ({ rows, grouping }) =>
      customGroupedRows(rows, grouping, getChildGroups);

    return (
      <Plugin
        name="CustomGrouping"
        dependencies={pluginDependencies}
      >
        {appliedGrouping && (
          <Getter name="grouping" value={appliedGrouping} />
        )}
        {appliedExpandedGroups && (
          <Getter name="expandedGroups" value={appliedExpandedGroups} />
        )}
        <Getter name="isGroupRow" value={groupRowChecker} />
        <Getter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <Getter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="getRowId" computed={getRowIdComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </Plugin>
    );
  },
};
