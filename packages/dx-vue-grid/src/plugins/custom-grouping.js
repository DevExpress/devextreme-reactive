import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  customGroupingRowIdGetter,
  customGroupedRows,
  expandedGroupRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxGroupingState' },
];

const getCollapsedRowsComputed = ({ getCollapsedRows }) =>
  groupCollapsedRowsGetter(getCollapsedRows);
const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);
const getRowIdComputed = ({ getRowId, rows }) =>
  customGroupingRowIdGetter(getRowId, rows);

export const DxCustomGrouping = {
  name: 'DxCustomGrouping',
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
      <DxPlugin
        name="DxCustomGrouping"
        dependencies={pluginDependencies}
      >
        {appliedGrouping && (
          <DxGetter name="grouping" value={appliedGrouping} />
        )}
        {appliedExpandedGroups && (
          <DxGetter name="expandedGroups" value={appliedExpandedGroups} />
        )}
        <DxGetter name="isGroupRow" value={groupRowChecker} />
        <DxGetter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <DxGetter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <DxGetter name="rows" computed={groupedRowsComputed} />
        <DxGetter name="getRowId" computed={getRowIdComputed} />
        <DxGetter name="rows" computed={expandedGroupedRowsComputed} />
      </DxPlugin>
    );
  },
};
