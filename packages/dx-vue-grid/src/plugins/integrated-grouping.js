import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  groupedRows,
  expandedGroupRows,
  getColumnExtension,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxGroupingState' },
];

const getCollapsedRowsComputed = (
  { getCollapsedRows },
) => groupCollapsedRowsGetter(getCollapsedRows);

const expandedGroupedRowsComputed = (
  { rows, grouping, expandedGroups },
) => expandedGroupRows(rows, grouping, expandedGroups);

export const DxIntegratedGrouping = {
  name: 'DxIntegratedGrouping',
  props: {
    columnExtensions: {
      type: Array,
    },
  },
  render() {
    const { columnExtensions } = this;
    const getColumnCriteria = columnName => getColumnExtension(
      columnExtensions, columnName,
    ).criteria;

    const groupedRowsComputed = (
      { rows, grouping, getCellValue },
    ) => groupedRows(rows, grouping, getCellValue, getColumnCriteria);

    return (
      <DxPlugin
        name="DxIntegratedGrouping"
        dependencies={pluginDependencies}
      >
        <DxGetter name="isGroupRow" value={groupRowChecker} />
        <DxGetter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <DxGetter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <DxGetter name="rows" computed={groupedRowsComputed} />
        <DxGetter name="rows" computed={expandedGroupedRowsComputed} />
      </DxPlugin>
    );
  },
};
